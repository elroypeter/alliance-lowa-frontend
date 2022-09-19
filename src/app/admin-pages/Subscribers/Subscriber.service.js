import { ApiService } from "../../services/ApiService";

const getSubscribersApi = async () => {
    const apiService = new ApiService();
    return await apiService.apiConnect("/subscriber", "get", {});
};

const deleteSubscriberApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/subscriber/${id}`, "delete", {});
};

export { getSubscribersApi, deleteSubscriberApi };
