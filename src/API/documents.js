import axios from "axios";
import {API_URL} from "../http";

export default class Documents {
    static async getDocuments(listId, currentPage) {
        try {
            const response = await
                axios({
                    method: 'POST',
                    url: `${API_URL}/api/v1/documents?limit=1&offset=${currentPage}`,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    data: {
                        "ids": listId
                    }
                })
            console.log('Ответ от сервера: ', response.data);
            return response.data;

       } catch(e) {
            console.log(e)
        }
    }
}