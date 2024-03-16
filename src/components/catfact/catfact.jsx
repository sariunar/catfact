import React, { useState } from 'react';
import axios from 'axios';
import './catfact.css';

const CatFact = () => {
    const [catfact, setCatfact] = useState('');

    const fetchCatfact = async () => {
        try {
            const data = await axios.get('https://catfact.ninja/fact');
            setCatfact(data.data.fact);
        } catch (error) {
            console.log(error);
        }
    };

    const handleButtonClick = () => {
        fetchCatfact();
    };

    return (
        <div className='catfact'>
            <button onClick={handleButtonClick}>Click</button>
            <textarea type='text' value={catfact} readOnly />
        </div>
    )
}
export default CatFact;