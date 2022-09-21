import { ApiService } from "../../services/ApiService";

const getMessageApi = async () => {
    const apiService = new ApiService();
    return await apiService.apiConnect("/messages", "get", {});
};

const getMessageDetailsApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/messages/${id}`, "get", {});
};

const deleteMessageApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/messages/${id}`, "delete", {});
};

export { getMessageApi, getMessageDetailsApi, deleteMessageApi };
