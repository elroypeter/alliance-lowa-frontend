import React from "react";
import { Routes, Route } from "react-router-dom";
import Error404 from "./Error/Error404";
import AuthGuard from "./guards/AuthGuard";

import { Layout as WebsiteLayout } from "../layouts/website/Layout";
import Home from "../web-pages/Home/Home";

import { Layout as AdminLayout } from "../layouts/admin/Layout";
import Dashboard from "../admin-pages/Dashboard/Dashboard";
import Project from "../admin-pages/Project/Project";
import Login from "../admin-pages/auth/Login";
import { AuthContext } from "../shared/AuthContext";

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
                        sessionToken={props.sessionToken}
                        hasValidSession={props.hasValidSession}
                        component={() => <AdminLayout />}
                    />
                }
            >
                <Route path="home" index element={<Dashboard />} />
                <Route path="projects" element={<Project />} />
                <Route path="news" element={<Project />} />
                <Route path="careers" element={<Project />} />
                <Route path="messages" element={<Project />} />
                <Route path="subscribers" element={<Project />} />
            </Route>

            <Route path="/auth">
                <Route
                    path="login"
                    index
                    element={
                        <AuthContext.Consumer>
                            {(context) => <Login context={context} />}
                        </AuthContext.Consumer>
                    }
                />
            </Route>

            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}
