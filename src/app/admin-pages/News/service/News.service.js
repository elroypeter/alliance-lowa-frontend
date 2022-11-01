import { ApiService } from '../../../services/ApiService';

const getNewsApi = async () => {
    const apiService = new ApiService();
    const results = await apiService.apiConnect('/api/blog-news', 'get', {});
    return results || [];
};

const getNewsDetailsApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/blog-news/${id}`, 'get', {});
};

const saveNewsApi = async (data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect('/api/blog-news', 'post', data);
};

const updateNewsTranslationApi = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/blog-news/translation/${id}`, 'put', data);
};

const addNewsAttachmentApi = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/project/attachment/${id}`, 'post', data);
};

const deleteNewsApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/blog-news/${id}`, 'delete', {});
};

const removeNewsAttachmentApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/project/attachment/${id}`, 'delete', {});
};

const publishNewsApi = async (id, status) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/blog-news/publish/${id}`, 'put', {
        status,
    });
};

const addNewsTranslationApi = async (id, data) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/blog-news/translation/${id}`, 'post', data);
};

const deleteNewsTranslationApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/translation/blog-news/${id}`, 'delete', {});
};

export {
    getNewsApi,
    saveNewsApi,
    updateNewsTranslationApi,
    deleteNewsApi,
    addNewsAttachmentApi,
    removeNewsAttachmentApi,
    publishNewsApi,
    getNewsDetailsApi,
    addNewsTranslationApi,
    deleteNewsTranslationApi,
};
