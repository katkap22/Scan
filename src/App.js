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
import AccountInfoService from "./API/accountInfoService";
import ObjectsearchHistograms from "./API/objectsearchHistograms";
import Objectsearch from "./API/objectsearch";
import Documents from "./API/documents";
import AuthService from "./services/AuthService";

function App() {

    const [users, setUsers] = useState([{
        id: 1,
        name: 'Алексей А.',
        ava: ava1,
        login: 'sf_student1',
        password: '4i2385j',
        tariff: 'Beginner'
    },]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');//пока нигде не использую
    const [usedCompCount, setUsedCompCount] = useState('');
    const [compLimit, setCompLimit] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [listId, setListId] = useState([]);
    const [docs, setDocs] = useState([]);
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            checkLogged()
        }
    }, []);
    useEffect(() => {
        console.log(fetching);
        if (fetching) {
            getDocuments();
        }

        console.log(docs.length);
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
                        const userCurrent = users.find(user => user.login === login && user.password === password);
                        localStorage.setItem('userCurrent', JSON.stringify(userCurrent));
                        fetchAccountInfo();
                        goHome();
                    }
                })
        } catch (e) {
            console.log('e: ', e)
            setError(e.message);
            setMessage('Введите корректные данные');
        }
    }

    function checkLogged() {
        setIsLoggedIn(true);
        fetchAccountInfo();
    }

    async function fetchAccountInfo() {
        setIsLoading(true);
        const accountInfo = await AccountInfoService.getAccountInfo();
        setCompLimit(accountInfo.companyLimit);
        setUsedCompCount(accountInfo.usedCompanyCount);
        setIsLoading(false);
    }

    function logOut() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expire');
        localStorage.removeItem('userCurrent');
        localStorage.removeItem('data');
        localStorage.removeItem('listId');
        setIsLoggedIn(false);
        // setUserCurrent({});
    }

    async function searchInfo() {
        setIsLoading(true);
        setTimeout(async () => {
            // const response = await ObjectsearchHistograms.getDataTotal();
            await ObjectsearchHistograms.getDataTotal()
                .then(response => {
                    console.log(response);
                    let datesArr = [];
                    let totalsArr = [];
                    let risksArr = [];

                    response.data[0].data.forEach(item => {
                        datesArr.push(new Date(item.date).toLocaleDateString());
                        totalsArr.push(item.value);
                    });

                    response.data[1].data.forEach(item => risksArr.push(item.value));

                    setDate(datesArr);
                    setTotal(totalsArr);
                    setRisk(risksArr);
                    console.log('результат 1го запроса: ', datesArr, totalsArr, risksArr);
                    searchId();
                    setIsLoading(false);
                })
            console.log('результат 1го запроса в state: ', date, total, risk);
        }, 5000);

        goResult();
    }

    async function searchId() {
        console.log('результат 1го запроса в state: ', date, total, risk);
        // const responseId = await Objectsearch.getListId(inn,startDate, endDate);
        await Objectsearch.getListId()
            .then(responseId => {
                console.log('2ой запрос на получение ID, ответ от сервера в моей переменной: ', responseId)

                let idArr = [];

                idArr = responseId.map(item => item.encodedId)

                console.log('Массив айдишек: ', idArr, 'длина массива: ', idArr.length);

                setCountId(idArr.length); //не работает
                setListId(idArr); //не работает - сработала

                console.log('Состояни - массив айдишек: ', listId);

                console.log('Массив с ID, который уходит в след запрос: ', listId);
                localStorage.setItem('listId', JSON.stringify(idArr));

            })
        getDocuments();
        goResult();
    }

    async function getDocuments() {
        const listIdFromLocalSt = JSON.parse(localStorage.getItem('listId'));
        console.log('fetching', fetching);
        await Documents.getDocuments(listIdFromLocalSt, currentPage)
            .then(documents => {
                setDocs([...docs, ...documents]);
                console.log(documents.length);
                console.log(listId.length);
                setCurrentPage(prevState => prevState + 1);
            })
            .finally(() => setFetching(false))
    }


    const [modal, setModal] = useState(false);
    const [date, setDate] = useState([]);
    const [total, setTotal] = useState([]);
    const [risk, setRisk] = useState([]);
    const [countId, setCountId] = useState(0);
    const [totalCount, setTotalCount] = useState(0); //общее кол-во публикаций
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);


    const btnHandler = () => {
        (listId.length < docs.length) &&
        setFetching(true);
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
                               element={<LoginForm users={users}
                                                   logIn={logIn}
                                                   logOut={logOut}
                                                   isLoggedIn={isLoggedIn}
                                                   setIsLoggedIn={setIsLoggedIn}
                                                   error={error}
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
                                       listId={listId}
                                       docs={docs}
                                       btnHandler={btnHandler}/>
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
