import axios from "axios";
import {API_URL} from "../http";

export default class ObjectsearchHistograms {
    static async getDataTotal() {
        try {
            const response = await
                axios({
                    method: 'POST',
                    url: `${API_URL}/api/v1/objectsearch/histograms`,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    data: {
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
                    },

                })

            console.log('Ответ от сервера: ', response.data)
            return response.data;

       } catch(e) {
            console.log(e)
        }
    }
}