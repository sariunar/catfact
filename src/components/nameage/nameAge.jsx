import React, { useState, useRef } from 'react';
import axios from 'axios';
import './nameAge.css';

const NameAge = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const timerRef = useRef(null);

    const handleNameChange = (event) => {
        const value = event.target.value;
        const onlyLetters = /^[a-zA-Zа-яА-Я]+$/; // Регулярное выражение для проверки только буквенных символов

        if (onlyLetters.test(value) || value === '') {
            setName(value);
        }
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => { getData(); }, 3000);
    };

    const getData = async () => {
        try {
            setLoading(true);
            setAge();
            setError();
            const data = await axios.get(`https://api.agify.io/?name=${name}`);
            setAge(data.data.age);
            setLoading(false);
            setError(null);
            if (data.data.age === null) {
                setError('Failed to get the age for this name');
                setAge(null);
            } else {
                setAge(data.data.age);
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getData();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='form_name'>
                <input type="text" value={name} onChange={handleNameChange} placeholder="enter a name" />
                <button type="submit" disabled={loading}>Отправить</button>
                {loading && <p>loading...</p>}
                {age && <p>Age: {age}</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default NameAge;