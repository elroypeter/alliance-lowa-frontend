import { ApiService } from '../../../services/ApiService';

const getProjectsApi = async () => {
    const apiService = new ApiService();
    const results = await apiService.apiConnect('/api/project', 'get', {});
    return results || [];
};

const getProjectDetailsApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/project/${id}`, 'get', {});
};

const saveProjectApi = async (data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect('/api/project', 'post', data);
};

const updateProjectTranslationApi = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/project/translation/${id}`, 'put', data);
};

const addProjectAttachmentApi = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/project/attachment/${id}`, 'post', data);
};

const deleteProjectApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/project/${id}`, 'delete', {});
};

const removeProjectAttachmentApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/project/attachment/${id}`, 'delete', {});
};

const publishProjectApi = async (id, status) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/project/publish/${id}`, 'put', {
        status,
    });
};

const addProjectTranslationApi = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/project/translation/${id}`, 'post', data);
};

const deleteProjectTranslationApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/translation/project/${id}`, 'delete', {});
};

export {
    getProjectsApi,
    saveProjectApi,
    updateProjectTranslationApi,
    deleteProjectApi,
    addProjectAttachmentApi,
    removeProjectAttachmentApi,
    publishProjectApi,
    getProjectDetailsApi,
    addProjectTranslationApi,
    deleteProjectTranslationApi,
};
