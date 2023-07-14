import {$api2} from "../http";

export default class ObjectSearchHistograms {
    static async getDataTotal() {
        try {
            return $api2.post('/histograms');
       } catch(e) {
            console.log(e)
        }
    }
}

//7710137066