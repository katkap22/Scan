import $api  from "../http";

export default class Documents {
    static async getDocuments(ids) {
        try {
            return (await $api.post('/api/v1/documents', {ids})).data
       } catch(e) {
            console.log(e)
        }
    }
}