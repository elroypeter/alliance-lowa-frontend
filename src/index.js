import React from 'react';
import '../public/assets/scss/app.scss';

// carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// bootstrap
import 'bootstrap';
import '@popperjs/core';

// React router
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';

// i18n setup
import './app/i18next/i18n';

// redux store setup
import { store } from './store';
import { Provider } from 'react-redux';

const rootMount = document.getElementById('root');

// mount application
if (rootMount) {
    window.preloader();
    createRoot(rootMount).render(
        <React.Suspense>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </React.Suspense>,
    );
}
