import { configureStore } from '@reduxjs/toolkit';
import imageSliderReducer from './app/admin-pages/Dashboard/store/ImageSlider.slice';
import languageReducer from './app/layouts/website/store/language.slice';
import homeSlideReducer from './app/web-pages/Home/store/Home.slice';
import imageSliderDetailsReducer from './app/admin-pages/Dashboard/store/ImageSliderDetails.slice';

export const store = configureStore({
    reducer: {
        imageSlider: imageSliderReducer,
        language: languageReducer,
        homeSlider: homeSlideReducer,
        imageSliderDetails: imageSliderDetailsReducer,
    },
});
