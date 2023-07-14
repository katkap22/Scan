import {$api2} from "../http";

export default class ObjectSearch {
    static async getListId() {
        try {
            return (await $api2.post('')).data.items;
       } catch(e) {
            console.log(e)
        }
    }
}