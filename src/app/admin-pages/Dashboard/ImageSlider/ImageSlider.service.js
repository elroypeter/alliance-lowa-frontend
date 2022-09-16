import { ApiService } from "../../../services/ApiService";

const getImageSlider = async () => {
    const apiService = new ApiService();
    return await apiService.apiConnect("/image-slider", "get", {});
};

const saveImageSlider = async (data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect("/image-slider", "post", data);
};

const updateImageSlider = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/image-slider/${id}`, "put", data);
};

const deleteImageSlider = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/image-slider/${id}`, "delete", {});
};

const publishImageSlider = async (id, status) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/image-slider/publish/${id}`, "put", {
        status,
    });
};

export {
    getImageSlider,
    saveImageSlider,
    deleteImageSlider,
    publishImageSlider,
    updateImageSlider,
};
