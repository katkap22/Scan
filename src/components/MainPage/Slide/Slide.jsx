import React from 'react';
import s from './Slide.module.css';

const Slide = ({icon, text}) => {
    return (
        <div className={s.slide}>
            <img src={icon} alt="icon"/>
            <div>{text}</div>
        </div>
    );
};

export default Slide;