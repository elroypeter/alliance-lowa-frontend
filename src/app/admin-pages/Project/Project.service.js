import { ApiService } from '../../services/ApiService';

const getProjectsApi = async () => {
    const apiService = new ApiService();
    return await apiService.apiConnect('/project', 'get', {});
};

const getProjectDetailsApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/project/${id}`, 'get', {});
};

const saveProjectApi = async (data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect('/project', 'post', data);
};

const updateProjectApi = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/project/${id}`, 'put', data);
};

const addProjectImageApi = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/project/add-image/${id}`, 'put', data);
};

const deleteProjectApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/project/${id}`, 'delete', {});
};

const removeProjectImageApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/project/remove-image/${id}`, 'delete', {});
};

const publishProjectApi = async (id, status) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/project/publish/${id}`, 'put', {
        status,
    });
};

export {
    getProjectsApi,
    saveProjectApi,
    updateProjectApi,
    deleteProjectApi,
    addProjectImageApi,
    removeProjectImageApi,
    publishProjectApi,
    getProjectDetailsApi,
};
