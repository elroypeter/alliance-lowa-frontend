import React from "react";
import { Routes, Route } from "react-router-dom";
import Error404 from "./Error/Error404";

import { Layout as WebsiteLayout } from "../layouts/website/Layout";
import Home from "../web-pages/Home/Home";

import { Layout as AdminLayout } from "../layouts/admin/Layout";
import Dashboard from "../admin-pages/Dashboard/Dashboard";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<WebsiteLayout />}>
                <Route index element={<Home />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
            </Route>

            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}
