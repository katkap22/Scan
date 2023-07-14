import $api from "../http";

export default class AccountInfoService {
    static async getAccountInfo() {
        try {
            return $api.get('/api/v1/account/info');
       } catch(e) {
            console.log(e)
        }
    }
}