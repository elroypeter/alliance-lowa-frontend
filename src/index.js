import React from 'react';
import '../public/assets/scss/app.scss';

// bootstrap
import 'bootstrap';
import '@popperjs/core';

// React router
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';

import './app/i18next/i18n';

const rootMount = document.getElementById('root');

// mount application
if (rootMount) {
    window.preloader();
    createRoot(rootMount).render(
        <React.Suspense>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.Suspense>,
    );
}
