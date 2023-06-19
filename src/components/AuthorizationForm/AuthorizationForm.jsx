import React from 'react';
import s from "./AuthorizationForm.module.css";
import imgAuth from "../../assets/images/imgAuth.svg";
import google from "../../assets/images/google.svg";
import facebook from "../../assets/images/facebook.svg";
import yandex from "../../assets/images/yandex.svg";
import lock from "../../assets/images/lock.svg";
import classNames from "classnames";

const AuthorizationForm = () => {
    return (
        <div className={s.authorizationForm}>
            <div className={s.content}>
                <div className={s.row}>

                    <div className={s.left}>
                        <h1 className={s.title}>Для оформления подписки
                            на тариф, необходимо авторизоваться.</h1>
                        <img src={imgAuth} alt="people with key"/>
                    </div>

                    <div className={s.right}>
                        <div className={s.form}>
                            <div className={s.links}>
                                <div className={classNames(s.first, s.active)}><a  href="##" className={s.link}>Войти</a></div>
                                <div className={classNames(s.second)}><a href="##" className={s.link}>Зарегистрироваться</a></div>
                            </div>

                            <form action="">

                                <label className={s.label}>Логин или номер телефона:
                                    <input className={s.input} type="tel" name="tel" required />
                                </label>

                                <label className={s.label}>Пароль:
                                    <input className={s.input} type="password" name="password" autoComplete="off" required />
                                </label>

                                <input className={s.submit} type="submit" value="Войти" />
                                <div className={s.restorePassw}><a href="##">Восстановить пароль</a></div>
                                <div className={s.titleSocial}>Войти через:</div>
                                <div className={s.social}>
                                    <button><img src={google} alt="google"/></button>
                                    <button><img src={facebook} alt="facebook"/></button>
                                    <button><img src={yandex} alt="yandex"/></button>
                                </div>
                            </form>
                            <img className={s.lock} src={lock} alt="lock"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthorizationForm;