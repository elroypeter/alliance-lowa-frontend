import React from 'react';
import './styles/app.scss';

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
    try {
        const root = createRoot(rootMount);
        root.render(
            <React.Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </React.Suspense>,
        );

        // Hide preloader after React app mounts
        if (window.preloader) {
            window.preloader();
        } else {
            // Fallback: hide preloader directly if function not available
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.display = 'none';
                }
            }, 100);
        }
    } catch (error) {
        console.error('Error mounting React application:', error);
        rootMount.innerHTML = '<div style="padding: 20px; color: red;">Error loading application. Please check the console for details.</div>';
        // Hide preloader even on error
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
} else {
    console.error('Root element not found. Cannot mount React application.');
}
