import React from "react";
import s from "./Header.module.css";
import logo from '../../assets/images/logoHeader.svg';
import line from '../../assets/images/lineHeader.svg';
import menuBurger from "../../assets/images/menuBurger.svg";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.content}>
                <div className={s.row}>
                    <img className={s.logo} src={logo} alt="logo"/>
                    <nav className={s.navHeader}>
                        <NavLink className={s.navLink} to="/main">Главная</NavLink>
                        <NavLink className={s.navLink} to="#">Тарифы</NavLink>
                        <NavLink className={s.navLink} to="#">FAQ</NavLink>
                    </nav>
                    <div className={s.loginPanel}>
                        <NavLink className={s.link} to="#">Зарегистрироваться</NavLink>
                        <img src={line} alt="line" />
                        <NavLink to="/authorizationForm"><button className={s.btnHeader}>Войти</button></NavLink>
                    </div>
                    <div className={s.loginPanelMobile}>
                        <img src={menuBurger} alt="menu burger"/>
                    </div>
                </div>

            </div>
        </header>
    )

}

export default Header;