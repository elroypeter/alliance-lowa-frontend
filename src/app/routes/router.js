import React from "react";
import { Routes, Route } from "react-router-dom";
import Error404 from "./Error/Error404";
import AuthGuard from "./guards/AuthGuard";

import { Layout as WebsiteLayout } from "../layouts/website/Layout";
import Home from "../web-pages/Home/Home";

import { Layout as AdminLayout } from "../layouts/admin/Layout";
import Dashboard from "../admin-pages/Dashboard/Dashboard";
import ProjectList from "../admin-pages/Project/ProjectList";
import Login from "../admin-pages/auth/Login";

export default function Router(props) {
    return (
        <Routes>
            <Route path="/" element={<WebsiteLayout />}>
                <Route index element={<Home />} />
            </Route>

            <Route
                path="/admin"
                element={
                    <AuthGuard
                        isLoggedIn={props.isLoggedIn}
                        component={() => <AdminLayout />}
                    />
                }
            >
                <Route path="home" index element={<Dashboard />} />
                <Route path="projects" element={<ProjectList />} />
                <Route path="news" element={<ProjectList />} />
                <Route path="careers" element={<ProjectList />} />
                <Route path="messages" element={<ProjectList />} />
                <Route path="subscribers" element={<ProjectList />} />
            </Route>

            <Route path="/auth">
                <Route
                    path="login"
                    index
                    element={<Login setLoginStatus={props.setLoginStatus} />}
                />
            </Route>

            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}
