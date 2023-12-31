import React from 'react';
import s from './SlideResult.module.css';
import line from '../../../assets/images/lineVertical.svg';

const SlideResult = ({date, total, risk}) => {
    return (
        <>
            <div className={s.slideResult}>
                <p> {date}</p>
                <p> {total}</p>
                <p> {risk}</p>
            </div>
            <img src={line} alt='line'/>
        </>

    );                                     //date={slides[slideNum].date} total={slides[slideNum].total} risk={slides[slideNum].risk
};

export default SlideResult;