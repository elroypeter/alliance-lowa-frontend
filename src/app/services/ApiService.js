import * as axios from 'axios';

export const baseUrl = () => {
    if (window.location.hostname === 'localhost') {
        return `http://${window.location.hostname}:5000`;
    } else {
        return `https://${window.location.hostname}/aws`;
    }
};

export class ApiService {
    constructor() {
        this.token = sessionStorage.getItem('token');
        this.baseUrl = baseUrl();
    }

    async apiConnect(url, method, data, params, getError) {
        try {
            const response = await axios({
                url: this.baseUrl + url,
                method,
                data,
                headers: {
                    token: this.token,
                },
                params,
            });
            return response.data;
        } catch (error) {
            if (getError) getError(error);
            return null;
        }
    }
}
