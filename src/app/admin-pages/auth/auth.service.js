import { ApiService } from '../../services/ApiService';

const loginUser = async (loginForm, getError) => {
    const apiService = new ApiService();
    return await apiService.apiConnect('/auth/login', 'post', loginForm, undefined, getError);
};

export { loginUser };
