import * as axios from "axios";

export class ApiService {
    constructor(baseUrl) {
        this.token = sessionStorage.getItem("token");
        this.baseUrl =
            baseUrl ||
            // "http://localhost:5000" ||
            "https://www.alliancelowa.org/api";
    }

    async apiConnect(url, method, data) {
        try {
            const response = await axios({
                url: this.baseUrl + url,
                method,
                data,
                headers: {
                    token: this.token,
                },
            });
            return response;
        } catch (error) {
            return error;
        }
    }
}
