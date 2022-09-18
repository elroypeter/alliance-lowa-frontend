import React from "react";
import "../public/assets/scss/app.scss";

// bootstrap
import "bootstrap";
import "@popperjs/core";

// React router
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

const rootMount = document.getElementById("root");

// mount application
if (rootMount) {
    window.preloader();
    createRoot(rootMount).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
