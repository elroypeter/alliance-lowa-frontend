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

export { getImageSlider, getProjects };
