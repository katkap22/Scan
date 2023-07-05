import React from 'react';
import s from './CardTariff.module.css';
import iconBeginner from '../../../assets/images/iconBeginner.svg';
import iconList from '../../../assets/images/iconsList.svg';
import {NavLink} from "react-router-dom";
import Button from "../../UI/button/Button";

const CardTariff = (props) => {
    const {title, subTitle, discountPrice, price, creditPrice, item1, item2, item3} = {...props}
    return (
        <div className={s.cardTariff}>
            <div className={s.header}>
                <h4 className={s.titleHeader}>{title}</h4>
                <div className={s.subTitle}>{subTitle}</div>
                <img className={s.iconTariff} src={iconBeginner} alt="icon of Beginner tariff"/>
            </div>

            <div className={s.main}>
                <div className={s.prices}>
                    <div className={s.discountPrice}>{discountPrice} ₽</div>
                    <div className={s.price}>{price} ₽</div>
                    <div className={s.creditPrice}>или {creditPrice} ₽/мес. при рассрочке на 24 мес.</div>
                </div>
                <div>
                    <h5 className={s.titleMain}>В тариф входит:</h5>
                    <ul className={s.list}>
                        <li><img src={iconList} alt="icon"/>{item1}Безлимитная история запросов</li>
                        <li><img src={iconList} alt="icon"/>{item2}Безопасная сделка</li>
                        <li><img src={iconList} alt="icon"/>{item3}Поддержка 24/7</li>
                    </ul>
                </div>
            </div>
            <div className={s.btnCardTariff}>
                <NavLink to="#"><Button className={s.btn}>Подробнее</Button></NavLink>
            </div>
            {/*<NavLink to="#"><button className={s.btn}>Подробнее</button></NavLink>*/}


        </div>
    );
};

export default CardTariff;