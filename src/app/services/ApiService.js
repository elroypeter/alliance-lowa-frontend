import * as axios from "axios";

export class ApiService {
    constructor(baseUrl, token) {
        this.token = token;
        this.baseUrl =
            baseUrl ||
            "http://localhost:5000" ||
            "https://www.alliancelowa.org/api";
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
