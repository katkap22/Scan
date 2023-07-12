import React from 'react';
import s from './CardTariff.module.css';
import iconBeginner from '../../../assets/images/iconBeginner.svg';
import iconPro from '../../../assets/images/iconPro.svg';
import iconBusiness from '../../../assets/images/iconBusiness.svg';
import iconList from '../../../assets/images/iconsList.svg';
import {NavLink} from "react-router-dom";
import Button from "../../UI/button/Button";
import classNames from "classnames";

const CardTariff = (props) => {
    const {title, subTitle, discountPrice, price, creditPrice, tariff} = {...props}

    const activeTariff = JSON.parse(localStorage.getItem('userCurrent'));

    return (
        <div className={classNames(s.cardTariff, activeTariff && activeTariff.tariff === title && s.cardTariffActive)}>
            <div className={classNames(s.header, tariff === '2' ? s.pro : tariff === '3' ? s.business : '')}>
                <h4 className={s.titleHeader}>{title}</h4>
                <div className={s.subTitle}>{subTitle}</div>
                <img className={s.iconTariff}
                     src={tariff === '1'
                         ? iconBeginner
                         : tariff === '2'
                             ? iconPro
                             : tariff === '3'
                                ? iconBusiness
                                 : ''}
                     alt="icon of Beginner tariff"/>
            </div>

            {
                activeTariff &&
                    title === activeTariff.tariff
                        ? <div className={s.activePlanka}>
                            <p>Текущий тариф</p>
                          </div>
                        : ''
            }

            <div className={s.main}>
                <div className={s.prices}>
                    <div className={s.discountPrice}>{discountPrice} ₽</div>
                    <div className={s.price}>{price} ₽</div>
                    <div className={classNames(s.creditPrice, tariff === '3' ? s.hidden: '')}> или {creditPrice} ₽/мес при рассрочке на 24 мес.</div>
                </div>
                <div>
                    <h5 className={s.titleMain}>В тариф входит:</h5>
                    <ul className={s.list}>
                        <li><img src={iconList} alt="icon"/>Безлимитная история запросов</li>
                        <li><img src={iconList} alt="icon"/>Безопасная сделка</li>
                        <li><img src={iconList} alt="icon"/>Поддержка 24/7</li>
                    </ul>
                </div>
            </div>


            {
                activeTariff &&
                    title === activeTariff.tariff
                        ?  <div className={s.btnCardTariff}>
                                <NavLink to="#">
                                    <Button className={classNames(s.activeTariffBtn)} >
                                        Перейти в личный кабинет
                                    </Button>
                                </NavLink>
                            </div>
                        :  <div className={s.btnCardTariff}>
                                <NavLink to="#"><Button>Подробнее</Button></NavLink>
                           </div>

            }



            {/*<NavLink to="#"><button className={s.btn}>Подробнее</button></NavLink>*/}


        </div>
    );
};

export default CardTariff;