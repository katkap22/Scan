import React from 'react';
import s from './Navigation.module.css';
import classNames from 'classnames';
import {NavLink} from "react-router-dom";

const Navigation = ({className}) => {
    return (
        <nav className={classNames(s.navHeader, className)} >
            <NavLink to="/"
                     className={({isActive}) => isActive ? s.activeLink: s.navLink}>Главная</NavLink>
            <NavLink to="/tariff"
                     className={({isActive}) => isActive ? s.activeLink: s.navLink}>Тарифы</NavLink>
            <NavLink to="/faq"
                     className={({isActive}) => isActive ? s.activeLink: s.navLink}>FAQ</NavLink>
        </nav>
    );
};

export default Navigation;