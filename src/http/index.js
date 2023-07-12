import axios from 'axios';

export const API_URL = 'https://gateway.scan-interfax.ru';

const $api = axios.create({
    baseURL: API_URL,
    // headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    // }
})

//Перехватчик - это обычная ф-ия, кот. будет отрабатывать на каждый запрос и на каждый ответ
//1) interceptor на запрос: перед каждым запросом он будет устанавливать в header Authorization и помещать туда токен
// config - это инстанс axios
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = 'application/json'
    return config;
})

//2) interceptor на ответ: если статус код 200, то мы ничего не делаем
//если же мы получили статус 401 (не авторизован) В этом проекте наверное не нужен

export default $api;