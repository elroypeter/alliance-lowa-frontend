import * as axios from "axios";

export class ApiService {
    constructor() {
        this.token = sessionStorage.getItem("token");

        if (window.location.hostname === "localhost") {
            this.baseUrl = `http://${window.location.hostname}:5000`;
        } else {
            this.baseUrl = `https://${window.location.hostname}/api`;
        }
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
