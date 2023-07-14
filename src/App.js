import s from './App.module.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/LoginForm/LoginForm";
import React, {useEffect, useState} from "react";
import RequestParam from "./components/RequestParam/RequestParam";
import {AuthProvider} from './components/hoc/AuthProvider'
import ava1 from "./assets/images/ava1.png";
import Result from "./components/Result/Result";
import Modal from "./components/UI/modal/Modal";
import logoModal from "./assets/images/logoModal.svg";
import closeModal from "./assets/images/closeModal.svg";
import Navigation from "./components/UI/navigation/Navigation";
import line from "./assets/images/lineHeader.svg";
import AccountInfoService from "./services/accountInfoService";
import ObjectSearchHistograms from "./services/objectSearchHistograms";
import ObjectSearch from "./services/objectSearch";
import Documents from "./API/documents";
import AuthService from "./services/AuthService";
import {v1} from "uuid";

function App(key, value) {

    const [users, setUsers] = useState([{
        id: 1,
        name: 'Алексей А.',
        ava: ava1,
        login: 'sf_student1',
        password: '4i2385j',
        tariff: 'Beginner'
    },]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fetching, setFetching] = useState(false); //при нажатии на кнопку - true/начинается запрос/по его окончании - false
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');//пока нигде не использую
    const [usedCompCount, setUsedCompCount] = useState('');
    const [compLimit, setCompLimit] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [listId, setListId] = useState([]);// ПЕРЕПРОВЕРИТЬ НА ИСПОЛЬЗОВАНИЕ И УДАЛИТЬ (ЕСТЬ В localStorage)
    const [docs, setDocs] = useState([]);
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [countPerRequest] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [offsetRequest, setOffsetRequest] = useState(0);
    const [isCompleted, setIsCompleted] = useState (false);


    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            checkLogged()
        }
    }, []);
    useEffect(() => {
        console.log('', fetching);
        if (fetching) {
            getDocuments();
        }
    }, [fetching])

    const goHome = () => navigate('/', {replace: true})
    const goResult = () => navigate('/result', {replace: true})

    async function logIn(login, password) {
        try {
            await AuthService.logIn(login, password)
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('accessToken', response.data.accessToken);
                        localStorage.setItem('expire', response.data.expire);
                        setIsLoggedIn(true);
                        //Не нашла где взять инфо о пользователе (по идее должна же приходить с сервера),
                        //поэтому создала переменню userCurrent c инфо о тек пользователе
                        const userCurrent = {
                            id: v1(),
                            name: 'Алексей А.', //с сервера не пришло, поэтому ставлю, как в макете
                            ava: ava1,
                            login: login,
                            password: password,
                            tariff: 'Beginner' //тоже с сервера должно было прийти
                        }


                            // users.find(user => user.login === login && user.password === password)

                        // возможно userCurrent лучше хранить в state????????????
                        localStorage.setItem('userCurrent', JSON.stringify(userCurrent));
                        fetchAccountInfo();
                        goHome();
                    }
                })
        } catch (e) {
            setError(e.response?.status);
            setMessage('Введите корректные данные');
        }
    }
    function checkLogged() {
        setIsLoggedIn(true);
        fetchAccountInfo();
    }
    async function fetchAccountInfo() {
        setIsLoading(true);
        await AccountInfoService.getAccountInfo()
            .then(response => {
                setCompLimit(response.data.eventFiltersInfo.companyLimit);
                setUsedCompCount(response.data.eventFiltersInfo.usedCompanyCount);
            })
        setIsLoading(false);
    }
    function logOut() {
        localStorage.clear();
        setIsLoggedIn(false);
    }
    async function searchInfo() {
        setIsLoading(true);
        await ObjectSearchHistograms.getDataTotal()
                .then(response => {
                    let dates = [];
                    let totals = [];
                    let risks = [];

                    response.data.data[0].data.forEach(item => {
                        dates.push(new Date(item.date).toLocaleDateString());
                        totals.push(item.value);
                    });

                    response.data.data[1].data.forEach(item => risks.push(item.value));

                    localStorage.setItem('date', JSON.stringify(dates));
                    localStorage.setItem('total', JSON.stringify(totals));
                    localStorage.setItem('risk', JSON.stringify(risks));
    console.log('результат 1го запроса: ', dates, totals, risks);
                    searchId();
                })

        // goResult();
    }
    async function searchId() {
        await ObjectSearch.getListId()
            .then(responseId => {
  console.log(responseId)
                // let idArr = [];
                let idArr = responseId.map(item => item.encodedId)
                localStorage.setItem('listId', JSON.stringify(idArr));// использую для перезагрузки страницы результа

  console.log('Массив айдишек: ', idArr, 'длина массива: ', idArr.length);

                console.log(JSON.parse(localStorage.getItem('listId')).length);
                goResult();
                getDocuments();
            })


    }
    async function getDocuments() {debugger
        let listIdFromLocalSt = JSON.parse(localStorage.getItem('listId'));

        listIdFromLocalSt = listIdFromLocalSt.slice(0 + offsetRequest, countPerRequest + offsetRequest);

        console.log(listIdFromLocalSt)
        console.log('fetching', fetching);
        await Documents.getDocuments(listIdFromLocalSt)
            .then(documents => {
                localStorage.setItem('docs', JSON.stringify(documents));
                setDocs([...docs, ...documents]); //для useEffect depend in Result

                console.log(documents.length);


                setIsLoading(false);
                // setCurrentPage(prevState => prevState + 1);
            })
            .finally(() => setFetching(false))
    }

//7710137066
    const [modal, setModal] = useState(false);
    const [date, setDate] = useState([]);
    const [total, setTotal] = useState([]);
    const [risk, setRisk] = useState([]);
    const [countId, setCountId] = useState(0); //пока не использую
    const [totalCount, setTotalCount] = useState(0); //общее кол-во публикаций
    const [page, setPage] = useState(1);


    const btnHandler = () => {debugger
        // (JSON.parse(localStorage.getItem('listId')).length < docs.length) &&
        // setFetching(true);
        if (offset < 100) {
            setOffset(offset + limit);
        } else if (offsetRequest < JSON.parse(localStorage.getItem('listId')).length) {
            setOffsetRequest(offsetRequest + 100);
            getDocuments();
        } else setIsCompleted(true);
    }


    return (
        <div className={s.App}>
            <Modal visible={modal} setVisible={setModal}>
                <div className={s.row}>
                    <img className={s.logo} src={logoModal} alt="logo"/>
                    <div onClick={() => setModal(false)}>
                        <img src={closeModal} alt="close modal"/>
                    </div>
                </div>

                <Navigation className={s.navModal}/>

                <div>
                    <div className={s.loginPanel}>
                        <NavLink className={s.link} to="/login">Зарегистрироваться</NavLink>
                            <img src={line} alt="line"/>
                        <NavLink to="/loginForm"
                                 className={({isActive}) => isActive ? s.activeLink : ''}>
                            <button className={s.btnHeader}>Войти</button>
                        </NavLink>
                    </div>
                </div>
            </Modal>

            <Header isLoggedin={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isLoading={isLoading}
                    logOut={logOut}
                    setVisible={setModal}
                    usedCompCount={usedCompCount}
                    compLimit={compLimit}/>

            <div className="wrapper">

                <AuthProvider>
                    <Routes>
                        <Route path="/"
                               element={<MainPage
                                   isLoggedin={isLoggedIn}
                               />}/>
                        <Route path="/loginForm"
                               element={<LoginForm
                                 //  users={users} хочу избавиться от массива пользователей
                                                   logIn={logIn}
                                                   logOut={logOut}
                                                   isLoggedIn={isLoggedIn}
                                                   setIsLoggedIn={setIsLoggedIn}
                                                   error={error}
                                                   setError={setError}
                                                   message={message}
                               />}/>
                        <Route path="/requestParam"
                               element={
                                   <RequestParam
                                       searchInfo={searchInfo}
                                       setEndDate={setEndDate}
                                       endDate={endDate}
                                       setStartDate={setStartDate}
                                       startDate={startDate}
                                   />
                               }/>
                        <Route path="/result"
                               element={
                                   // <RequireAuth>
                                   <Result
                                       date={date}
                                       total={total}
                                       risk={risk}
                                       isLoading={isLoading}
                                       countId={countId}
                                       // listId={listId}
                                       docs={docs}
                                       btnHandler={btnHandler}
                                       limit={limit}
                                       offset={offset}
                                       isCompleted={isCompleted}/>
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
