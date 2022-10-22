import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Error404 from './Error/Error404';
import AuthGuard from './guards/AuthGuard';

import { Layout as WebsiteLayout } from '../layouts/website/Layout';
import Home from '../web-pages/Home/Home';

import { Layout as AdminLayout } from '../layouts/admin/Layout';
import Dashboard from '../admin-pages/Dashboard/Dashboard';
import Project from '../admin-pages/Project/Project';
import Login from '../admin-pages/auth/Login';
import { AuthContext } from '../shared/AuthContext';
import ProjectDetails from '../admin-pages/Project/ProjectDetails/ProjectDetails';
import Subscriber from '../admin-pages/Subscribers/Subscriber';
import Message from '../admin-pages/Messages/Message';
import ContactUs from '../web-pages/Contact-Us/ContactUs';
import WhoWeAre from '../web-pages/Who-We-Are/WhoWeAre';
import WhatWeDo from '../web-pages/What-We-Do/WhatWeDo';
import NewsCareer from '../web-pages/News-Careers/NewsCareers';

export default function Router(props) {
    return (
        <Routes>
            <Route path="/" element={<WebsiteLayout />}>
                <Route index element={<Home getImageSlides={props.getImageSlides} imageSlides={props.imageSlides} />} />
                <Route path="who-we-are" element={<WhoWeAre />} />
                <Route path="what-we-do" element={<WhatWeDo />} />
                <Route path="new-and-careers" element={<NewsCareer />} />
                <Route path="contact-us" element={<ContactUs />} />
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

                <Route path="projects">
                    <Route path="" index element={<Project />} />
                    <Route path=":id/:title" index element={<ProjectDetails />} />
                </Route>

                <Route path="news" element={<Project />} />
                <Route path="careers" element={<Project />} />
                <Route path="messages">
                    <Route path="" index element={<Message />} />
                </Route>
                <Route path="subscribers" element={<Subscriber />} />
            </Route>

            <Route path="/auth">
                <Route path="login" index element={<AuthContext.Consumer>{(context) => <Login context={context} />}</AuthContext.Consumer>} />
            </Route>

            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}
