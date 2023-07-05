import React from 'react';
import s from './Resullt.module.css';
import img from '../../assets/images/imgResult.svg';

const Result = () => {
    return (
        <div className={s.result}>
            <div className={s.content}>
                <h1 className={s.title}>Ищем. Скоро будут результаты</h1>
                <img src={img} alt="image" />
            </div>

        </div>
    );
};

export default Result;