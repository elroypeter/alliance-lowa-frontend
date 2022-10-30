import { ApiService } from '../../../services/ApiService';

const getMessageApi = async () => {
    const apiService = new ApiService();
    const result = await apiService.apiConnect('/api/contact-message', 'get', {});
    return result || [];
};

const getMessageDetailsApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/contact-message/${id}`, 'get', {});
};

const deleteMessageApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/contact-message/${id}`, 'delete', {});
};

export { getMessageApi, getMessageDetailsApi, deleteMessageApi };
