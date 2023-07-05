import axios from "axios";
import {API_URL} from "../http";

export default class AccountInfoService {
    static async getAccountInfo() {
        try {
            const response = await
                axios({
                    method: 'GET',
                    url: `${API_URL}/api/v1/account/info`,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })

            return response.data.eventFiltersInfo;

       } catch(e) {
            console.log(e)
        }
    }
}