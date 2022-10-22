import { ApiService } from '../services/ApiService';

const getImageSlider = async () => {
    const apiService = new ApiService();
    return await apiService.apiConnect('/website/image-slider', 'get', {});
};

export { getImageSlider };
