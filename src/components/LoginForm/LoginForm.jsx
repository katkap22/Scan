import React, {isValidElement, useState} from 'react';
import s from "./LoginForm.module.css";
import classNames from "classnames";
import imgAuth from "../../assets/images/imgAuth.svg";
import imgAuthMob from "../../assets/images/imgAuthMob.svg";
import google from "../../assets/images/google.svg";
import facebook from "../../assets/images/facebook.svg";
import yandex from "../../assets/images/yandex.svg";
import lock from "../../assets/images/lock.svg";
import {NavLink} from "react-router-dom";
import Button from "../UI/button/Button";

const LoginForm = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.logIn(login, password);
    }

    return (<div className={s.loginForm}>
        <div className={s.content}>
            <div className={s.row}>
                <div className={s.left}>
                    <h1 className={s.title}>Для оформления подписки
                        на тариф, необходимо авторизоваться.</h1>
                    <h1 className={s.titleMob}>Для оформления подписки<br/>
                        на тариф, необходимо авторизоваться.</h1>
                    <img src={imgAuth} alt="people with key"/>
                </div>
                <div className={s.right}>
                    <div className={s.form}>
                        <img className={s.lock} src={lock} alt="lock"/>
                        <div className={s.links}>
                            <div className={classNames(s.first, s.active)}>
                                <NavLink to="#" className={s.link}>Войти</NavLink>
                            </div>
                            <div className={classNames(s.second)}>
                                <NavLink to="#" className={s.link}>Зарегистрироваться</NavLink>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label className={s.label}>Логин или номер телефона:
                                <input className={classNames(s.input, props.error && s.error)}
                                       type="text"
                                       name="text"
                                       value={login}
                                       onChange={e => {
                                           props.setError('');
                                           setLogin(e.target.value);
                                       }}/>
                            </label>
                            <div className={s.errorLogin}>
                                {props.error && <p>{props.message}</p>}
                            </div>
                            <label className={s.label}>Пароль:
                                <input className={classNames(s.input, props.error && s.error)}
                                       type="password"
                                       name="password"
                                       autoComplete="off"
                                       value={password}
                                       onChange={e => {
                                           props.setError('');
                                           setPassword(e.target.value);
                                       }}
                                />
                            </label>
                            <div className={s.errorLogin}>
                                {props.error && <p>Неправильный пароль</p>}
                            </div>
                            <Button className={classNames(s.submit, login && password ? s.active : {})}>
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
    </div>);
};

export default LoginForm;