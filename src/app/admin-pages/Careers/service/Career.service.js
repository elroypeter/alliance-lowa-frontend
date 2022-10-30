import { ApiService } from '../../../services/ApiService';

const getCareerApi = async () => {
    const apiService = new ApiService();
    const results = await apiService.apiConnect('/api/careers', 'get', {});
    return results || [];
};

const getCareerDetailsApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/careers/${id}`, 'get', {});
};

const saveCareerApi = async (data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect('/api/careers', 'post', data);
};

const updateCareerApi = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/careers/${id}`, 'put', data);
};

const deleteCareerApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/careers/${id}`, 'delete', {});
};

const publishCareerApi = async (id, status) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/careers/publish/${id}`, 'patch', {
        status,
    });
};

export { getCareerApi, saveCareerApi, updateCareerApi, deleteCareerApi, publishCareerApi, getCareerDetailsApi };
