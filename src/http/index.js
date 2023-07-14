import axios from 'axios';

export const API_URL = 'https://gateway.scan-interfax.ru';
export const API_URL_2 = 'https://gateway.scan-interfax.ru/api/v1/objectsearch'

const $api = axios.create({
    baseURL: API_URL,
})

//Перехватчик - это обычная ф-ия, кот. будет отрабатывать на каждый запрос и на каждый ответ
//1) interceptor на запрос: перед каждым запросом он будет устанавливать в header Authorization и помещать туда токен
// config - это инстанс axios
$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = 'application/json'
    return config;
})

export const $api2 = axios.create({
    baseURL: API_URL_2,
})

$api2.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = 'application/json'
    config.data = {
        "intervalType": "month",
        "histogramTypes": [
            "totalDocuments",
            "riskFactors"
        ],
        "issueDateInterval": {
            "startDate": new Date(JSON.parse(localStorage.getItem('data')).startDate).toISOString(),
            "endDate": new Date(JSON.parse(localStorage.getItem('data')).endDate).toISOString()
        },
        "searchContext": {
            "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                    {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": JSON.parse(localStorage.getItem('data')).inn, //7710137066
                        "maxFullness": JSON.parse(localStorage.getItem('data')).checkbox.maxFullness && false, //true,
                        "inBusinessNews": JSON.parse(localStorage.getItem('data')).checkbox.inBusinessNews && false, //null
                    }
                ],
                "onlyMainRole": JSON.parse(localStorage.getItem('data')).checkbox.onlyMainRole && false, //true,
                "tonality": JSON.parse(localStorage.getItem('data')).selectTone, //"any",
                "onlyWithRiskFactors": JSON.parse(localStorage.getItem('data')).checkbox.onlyWithRiskFactors && false, //false,
                "riskFactors": {
                    "and": [],
                    "or": [],
                    "not": []
                },
                "themes": {
                    "and": [],
                    "or": [],
                    "not": []
                },
            },
            "themesFilter": {
                "and": [],
                "or": [],
                "not": []
            }
        },
        "attributeFilters": {
            "excludeTechNews": JSON.parse(localStorage.getItem('data')).checkbox.excludeTechNews && false, //true,
            "excludeAnnouncements": JSON.parse(localStorage.getItem('data')).checkbox.excludeAnnouncements && false, //true,
            "excludeDigests": JSON.parse(localStorage.getItem('data')).checkbox.excludeDigests && false, //true
        },
        "similarMode": "none",
        "limit": JSON.parse(localStorage.getItem('data')).countDocs, //100,
        "sortType": "issueDate",
        "sortDirectionType": "asc"
    }
    return config;
})

export default $api;