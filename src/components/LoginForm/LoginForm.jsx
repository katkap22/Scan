import React from 'react';
import s from "./LoginForm.module.css";
import classNames from "classnames";
import imgAuth from "../../assets/images/imgAuth.svg";
import imgAuthMob from "../../assets/images/imgAuthMob.svg";
import google from "../../assets/images/google.svg";
import facebook from "../../assets/images/facebook.svg";
import yandex from "../../assets/images/yandex.svg";
import lock from "../../assets/images/lock.svg";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../UI/button/Button";


const LoginForm = (props) => {

    const navigate = useNavigate();

    const goHome = () => navigate('/', {replace: true})


    const handleSubmit = (e) => {
        e.preventDefault();
console.log(props.isLoggedIn);
        // localStorage.setItem('isLoggedIn', true);
        console.log('form is submitted. login value is ', props.login, 'password value is ', props.password);

        props.setIsLoggedIn(true);
console.log(props.isLoggedIn);

        const userCurrent = props.users.find(user => user.login === props.login && user.password === props.password);
        console.log(userCurrent);
        if (!props.isLoggedIn) {
            props.setUserCurrent(userCurrent);
            localStorage.setItem('userCurrent', JSON.stringify(userCurrent));
            console.log(userCurrent.name);
            console.log(userCurrent.ava);
        }
        goHome();
    }

    return (
        <div className={s.loginForm}>
            <div className={s.content}>

                <div className={s.row}>

                    <div className={s.left}>
                        <h1 className={s.title}>Для оформления подписки
                            на тариф, необходимо авторизоваться.</h1>
                        <h1 className={s.titleMob}>Для оформления подписки<br />
                            на тариф, необходимо авторизоваться.</h1>
                        <img src={imgAuth} alt="people with key"/>
                    </div>

                    <div className={s.right}>
                        <div className={s.form}>
                            <img className={s.lock} src={lock} alt="lock"/>

                            <div className={s.links}>
                                <div className={classNames(s.first, s.active)}>
                                    <NavLink  to="#" className={s.link}>Войти</NavLink>
                                </div>
                                <div className={classNames(s.second)}>
                                    <NavLink to="#" className={s.link}>Зарегистрироваться</NavLink>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>

                                <label className={s.label}>Логин или номер телефона:
                                    <input className={s.input}
                                           type="text"
                                           name="text"
                                           value={props.login}
                                           onChange={e => props.setLogin(e.target.value)}
                                           required />
                                </label>

                                <label className={s.label}>Пароль:
                                    <input className={s.input}
                                           type="password"
                                           name="password"
                                           autoComplete="off"
                                           value={props.password}
                                           onChange={e => props.setPassword(e.target.value)}
                                           required />
                                </label>

                                {/*<button className={classNames(s.submit, props.login && props.password ? s.active : {})}>*/}
                                {/*    Войти*/}
                                {/*</button>*/}

                                <Button className={classNames(s.submit,props.login && props.password ? s.active : {})}>
                                    Войти
                                </Button>

                                <div className={s.restorePassw}><NavLink to='#'>Восстановить пароль</NavLink></div>
                                <div className={s.titleSocial}>Войти через:</div>
                                <div className={s.social}>
                                    <NavLink to='#'><img src={google} alt="google"/></NavLink>
                                    <NavLink to='#'><img src={facebook} alt="facebook"/></NavLink>
                                    <NavLink to='#'><img src={yandex} alt="yandex"/></NavLink>
                                </div>
                            </form>

                        </div>
                        <img className={s.peopleMob} src={imgAuthMob} alt="people with key"/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginForm;