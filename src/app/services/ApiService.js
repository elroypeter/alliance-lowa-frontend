import * as axios from "axios";

export class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || "http://alliancelowa.org/api";
    }

    async apiConnect(url, method, data) {
        try {
            const response = await axios({
                url: this.baseUrl + url,
                method,
                data,
            });
            return response;
        } catch (error) {
            return error;
        }
    }
}
