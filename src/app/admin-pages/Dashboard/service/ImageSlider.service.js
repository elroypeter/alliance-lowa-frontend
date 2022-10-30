import { ApiService } from '../../../services/ApiService';

const getImageSlider = async () => {
    const apiService = new ApiService();
    const result = await apiService.apiConnect('/api/image-slider', 'get', {});
    return result || [];
};

const getSingleImageSlider = async (id) => {
    const apiService = new ApiService();
    const result = await apiService.apiConnect(`/api/image-slider/${id}`, 'get', {});
    return result;
};

const saveImageSlider = async (data) => {
    const apiService = new ApiService();
    const result = await apiService.apiConnect('/api/image-slider', 'post', data);
    return result || [];
};

const addImageTranslation = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/image-slider/translation/${id}`, 'post', data);
};

const updateImageTranslation = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/image-slider/translation/${id}`, 'put', data);
};

const deleteImageSlider = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/image-slider/${id}`, 'delete', {});
};

const deleteTranslation = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/translation/image-slider/${id}`, 'delete', {});
};

const publishImageSlider = async (id, status) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/image-slider/publish/${id}`, 'put', {
        status,
    });
};

export {
    getImageSlider,
    saveImageSlider,
    deleteImageSlider,
    publishImageSlider,
    updateImageTranslation,
    getSingleImageSlider,
    addImageTranslation,
    deleteTranslation,
};
