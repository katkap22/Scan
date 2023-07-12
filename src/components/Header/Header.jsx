import React, {useState} from "react";
import s from "./Header.module.css";
import logo from '../../assets/images/logoHeader.svg';
import logoModal from '../../assets/images/logoModal.svg';
import closeModal from '../../assets/images/closeModal.svg';
import line from '../../assets/images/lineHeader.svg';
import menuBurger from "../../assets/images/menuBurger.svg";

import spinner from "../../assets/images/spinner.svg";
import {NavLink, useNavigate} from "react-router-dom";
import Modal from "../UI/modal/Modal";
import Navigation from "../UI/navigation/Navigation";
import Loader from "../UI/loader/Loader";
import LoginForm from "../LoginForm/LoginForm";


const Header = (props) => {

    return (
        <header className={s.header}>

            {/*<Modal>*/}
                {/*<div className={s.row}>*/}
                {/*    <img className={s.logo} src={logoModal} alt="logo"/>*/}
                {/*    <div onClick={() => {}}>*/}
                {/*        <img src={closeModal} alt="close modal"/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<Navigation className={s.navModal}/>*/}

                {/*<div>*/}
                {/*    <div className={s.loginPanel}>*/}
                {/*        <NavLink className={s.link} to="/login">Зарегистрироваться</NavLink>*/}
                {/*        <img src={line} alt="line" />*/}
                {/*        <NavLink to="/loginForm"*/}
                {/*                 className={({isActive}) => isActive ? s.activeLink:''}>*/}
                {/*            <button className={s.btnHeader}>Войти</button>*/}
                {/*        </NavLink>*/}

                {/*    </div>*/}
                {/*</div>*/}
            {/*</Modal>*/}

            <div className={s.content}>
                <div className={s.row}>
                    <img className={s.logo} src={logo} alt="logo"/>
                    <Navigation />

                    <div className={s.loginPanelMobile}
                         onClick={() => props.setVisible(true)}>
                        <img src={menuBurger} alt="menu burger"/>
                    </div>
                    {
                        !props.isLoggedin ?

                            <div>
                                <div className={s.loginPanel}>
                                    <NavLink className={s.link} to="/login">Зарегистрироваться</NavLink>
                                    <img src={line} alt="line" />
                                    <NavLink to="/loginForm"
                                             className={({isActive}) => isActive ? s.activeLink:''}>
                                        <button className={s.btnHeader}>Войти</button>
                                    </NavLink>

                                </div>
                            </div> :

                            <div className={s.infoPanel}>
                                <div className={s.infoCompany}>
                                {
                                    props.isLoading
                                        ?  <Loader />
                                        :  <>
                                            <p className={s.use}>Использовано компаний <span>{props.usedCompCount}</span> </p>
                                            <p className={s.limit}>Лимит по компаниям <span>{props.compLimit}</span> </p>
                                          </>
                                }
                            </div>

                                <div className={s.infoUser}>
                                    <div className={s.column}>
                                        <p>{JSON.parse(localStorage.getItem('userCurrent')).name}</p>
                                        {/*<p>{props.userCurrent.name}</p>*/}
                                        <NavLink to={'/'}>
                                            <button onClick={props.logOut}>Выйти</button>
                                        </NavLink>
                                    </div>
                                    <img src={JSON.parse(localStorage.getItem('userCurrent')).ava} alt='avatar'/>
                                </div>
                            </div>
                    }

                </div>

            </div>
        </header>
    )

}

export default Header;