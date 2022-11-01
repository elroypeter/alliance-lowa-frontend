import { ApiService } from '../../../services/ApiService';

const getSubscribersApi = async () => {
    const apiService = new ApiService();
    const result = await apiService.apiConnect('/api/subscriber', 'get', {});
    return result || [];
};

const deleteSubscriberApi = async (id) => {
    const apiService = new ApiService();
    return await apiService.apiConnect(`/api/subscriber/${id}`, 'delete', {});
};

export { getSubscribersApi, deleteSubscriberApi };
