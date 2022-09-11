import React from "react";
import { Routes, Route } from "react-router-dom";
import Error404 from "./Error/Error404";

import { Layout as WebsiteLayout } from "../layouts/website/Layout";
import Home from "../web-pages/Home/Home";

import { Layout as AdminLayout } from "../layouts/admin/Layout";
import Dashboard from "../admin-pages/Dashboard/Dashboard";
import ProjectList from "../admin-pages/Project/ProjectList";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<WebsiteLayout />}>
                <Route index element={<Home />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="home" index element={<Dashboard />} />
                <Route path="projects" element={<ProjectList />} />
                <Route path="news" element={<ProjectList />} />
                <Route path="careers" element={<ProjectList />} />
                <Route path="messages" element={<ProjectList />} />
                <Route path="subscribers" element={<ProjectList />} />
            </Route>

            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}
