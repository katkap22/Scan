import $api from "../http";

export default class AuthService {
    static async logIn(login, password){
        return $api.post('/api/v1/account/login', {login, password})
    }
}
