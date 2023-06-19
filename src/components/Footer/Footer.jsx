import React from "react";
import s from "./Footer.module.css";
import logoFooter from '../../assets/images/logoFooter.svg';

const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.content}>
                <div className={s.row}>
                    <img className={s.logo} src={logoFooter} alt="logo"/>
                    <div className={s.text}>
                        <p className={s.contacts}>г. Москва, Цветной б-р, 40
                            +7 495 771 21 11
                            info@skan.ru</p>
                        <p className={s.copyright}>Copyright. 2022</p>
                    </div>
                </div>
            </div>
        </footer>
    )

}

export default Footer