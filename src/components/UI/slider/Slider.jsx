import React from 'react';
import s from './Slider.module.css';
import arrow from "../../../assets/images/arrowRight.svg";

const Slider = ({children, ...props}) => {

    const onShowPrevBtnClick = () => {
        let newArrSlideNumbers = props.slideNumbers.map(slideNum => slideNum === 0 ? props.slides.length - 1 : slideNum - 1);
        props.setSlideNumbers(newArrSlideNumbers);
        props.setSlides([...props.slides]);
    }

    const onShowNextBtnClick = () => {
        let newArrSlideNumbers = props.slideNumbers.map(slideNum => slideNum === props.slides.length - 1 ? 0 : slideNum + 1);
        props.setSlideNumbers(newArrSlideNumbers);
        props.setSlides([...props.slides]);
    }

    return (
        <div className={s.slider}>
            <div className={s.slides}>
                {children}
            </div>

            <div className={s.arrows}>
                <button className={s.left}
                        onClick={onShowPrevBtnClick}>
                    <img src={arrow} alt="arrow on the left"/>
                </button>
                <button className={s.right}
                        onClick={onShowNextBtnClick}>
                    <img src={arrow} alt="arrow on the right"/>
                </button>
            </div>
        </div>
    );
};

export default Slider;