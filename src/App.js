import s from './App.module.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {NavLink, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/LoginForm/LoginForm";
import React, {useEffect, useState} from "react";
import axios from "axios";
import RequestParam from "./components/RequestParam/RequestParam";

import RequireAuth from './components/hoc/RequireAuth';
import {AuthProvider} from './components/hoc/AuthProvider'
import ava1 from "./assets/images/ava1.png";
import Result from "./components/Result/Result";
import {API_URL} from "./http";
import Modal from "./components/UI/modal/Modal";
import logoModal from "./assets/images/logoModal.svg";
import closeModal from "./assets/images/closeModal.svg";
import Navigation from "./components/UI/navigation/Navigation";
import line from "./assets/images/lineHeader.svg";
import AccountInfoService from "./API/accountInfoService";








function App() {
    const [users, setUsers] = useState([
        {id: 1, name: 'Алексей А.', ava: ava1, login: 'sf_student1', password: '4i2385j'},
        {id: 2, name: 'Александр Р.', ava: ava1, login: 'sf_student10', password: 'KHKfTXb'},
        {id: 3, name: 'Екатерина К.', ava: ava1, login: 'sf_student3', password: '6z9ZFRs'}
    ]);

    // const [userCurrent, setUserCurrent] = useState(JSON.parse(localStorage.getItem('userCurrent')));
    const [userCurrent, setUserCurrent] = useState(null);

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState( localStorage.getItem('isLoggedIn') === 'true');

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false);

    const [modal, setModal] = useState(false);

    const [usedCompCount, setUsedCompCount] = useState('55');
    const [compLimit, setCompLimit] = useState('200');

    // if(isLoading) {
    //     return <div>Загрузка...</div>
    // }


    useEffect(() => {
        if (login && password) {
        axios({
            method: 'POST',
            url: `${API_URL}/api/v1/account/login`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: {
                login: login,
                password: password
            }
        })
            .then(response => {
        console.log("Success", response);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('expire', response.data.expire);
        console.log('isLoggedIn from axios_1', isLoggedIn);
            })
            .catch(error => {
        console.error("Error", error)
                setMessage('Что то пошло не так! Попробуйте еще раз');
        console.log(message);
            })
    }}, [isLoggedIn, login, password, message]);

    useEffect(() => {
        if(isLoggedIn)
        fetchAccountInfo();
    }, [isLoggedIn])

    async function fetchAccountInfo() {
        setIsLoading(true);
        setTimeout(async() => {
            const accountInfo = await AccountInfoService.getAccountInfo();
            console.log(accountInfo);
            setCompLimit(accountInfo.companyLimit);
            setUsedCompCount(accountInfo.usedCompanyCount);
            setIsLoading(false);
        }, 2000)
    }


    return (
        <div className={s.App}>
            <Modal visible={modal} setVisible={setModal}>
                <div className={s.row}>
                    <img className={s.logo} src={logoModal} alt="logo"/>
                    <div onClick = {()=> setModal(false)}>
                        <img src={closeModal} alt="close modal"/>
                    </div>
                </div>

                <Navigation className={s.navModal}/>

                <div>
                    <div className={s.loginPanel}>
                        <NavLink className={s.link} to="/login">Зарегистрироваться</NavLink>
                        <img src={line} alt="line" />
                        <NavLink to="/loginForm"
                                 className={({isActive}) => isActive ? s.activeLink:''}>
                            <button className={s.btnHeader}>Войти</button>
                        </NavLink>

                    </div>
                </div>
            </Modal>

            <Header isLoggedin={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isLoading={isLoading}
                    login={login}
                    password={password}
                    setLogin={setLogin}
                    setPassword={setPassword}
                    userCurrent={userCurrent}
                    setUserCurrent={setUserCurrent}
                    setVisible={setModal}
                    usedCompCount={usedCompCount}
                    compLimit={compLimit}/>

            <div className="wrapper">

                <AuthProvider>
                    <Routes>
                        <Route path="/"
                               element={<MainPage isLoggedin={isLoggedIn}/>}/>
                        <Route path="/loginForm"
                               element={<LoginForm users={users}
                                                   setUserCurrent={setUserCurrent}
                                                   isLoggedIn={isLoggedIn}
                                                   setIsLoggedIn={setIsLoggedIn}
                                                   login={login}
                                                   setLogin={setLogin}
                                                   password={password}
                                                   setPassword={setPassword}
                               />}/>
                        <Route path="/requestParam"
                               element={
                                   // <RequireAuth>
                                       <RequestParam/>
                                   // </RequireAuth>
                               }/>
                        <Route path="/result"
                               element={
                                   // <RequireAuth>
                                   <Result/>
                                   // </RequireAuth>
                               }/>
                    </Routes>
                </AuthProvider>

            </div>

            <Footer/>
        </div>
    );
}

export default App;
