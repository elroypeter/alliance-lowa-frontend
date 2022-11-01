import { configureStore } from '@reduxjs/toolkit';
import imageSliderReducer from './app/admin-pages/Dashboard/store/ImageSlider.slice';
import languageReducer from './app/layouts/website/store/language.slice';
import homeSlideReducer from './app/web-pages/Home/store/Home.slice';
import webProjectReducer from './app/web-pages/What-We-Do/store/webProject.slice';
import imageSliderDetailsReducer from './app/admin-pages/Dashboard/store/ImageSliderDetails.slice';
import projectReducer from './app/admin-pages/Project/store/Project.slice';
import projectDetailsReducer from './app/admin-pages/Project/store/ProjectDetails.slice';
import subscriberReducer from './app/admin-pages/Subscribers/store/Subscriber.slice';
import messageReducer from './app/admin-pages/Messages/store/Message.slice';
import messageDetailReducer from './app/admin-pages/Messages/store/MessageDetails.slice';
import newsReducer from './app/admin-pages/News/store/News.slice';
import newsDetailsReducer from './app/admin-pages/News/store/NewsDetails.slice';
import careerReducer from './app/admin-pages/Careers/store/Career.slice';
import careerDetailsReducer from './app/admin-pages/Careers/store/CareerDetails.slice';

export const store = configureStore({
    reducer: {
        imageSlider: imageSliderReducer,
        language: languageReducer,
        homeSlider: homeSlideReducer,
        webProject: webProjectReducer,
        imageSliderDetails: imageSliderDetailsReducer,
        project: projectReducer,
        projectDetails: projectDetailsReducer,
        subscriber: subscriberReducer,
        message: messageReducer,
        messageDetails: messageDetailReducer,
        news: newsReducer,
        newsDetails: newsDetailsReducer,
        career: careerReducer,
        careerDetails: careerDetailsReducer,
    },
});
