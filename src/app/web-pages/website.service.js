import { ApiService } from '../services/ApiService';

const getImageSlider = async (params) => {
    const apiService = new ApiService();
    const result = await apiService.apiConnect('/api/public/image-slider', 'get', {}, { ...params });
    return result || [];
};

const getProjects = async (params) => {
    const apiService = new ApiService();
    const result = await apiService.apiConnect('/api/public/project', 'get', {}, { ...params });
    return result || [];
};

const getCareers = async (params) => {
    const apiService = new ApiService();
    const result = await apiService.apiConnect('/api/public/careers', 'get', {}, { ...params });
    return result || [];
};

const getNews = async (params) => {
    const apiService = new ApiService();
    const result = await apiService.apiConnect('/api/public/blog-news', 'get', {}, { ...params });
    return result || [];
};

export { getImageSlider, getProjects, getCareers, getNews };
