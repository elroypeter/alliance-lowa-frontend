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
import MessageDetails from '../admin-pages/Messages/MessageDetails/MessageDetails';
import ContactUs from '../web-pages/Contact-Us/ContactUs';
import WhoWeAre from '../web-pages/Who-We-Are/WhoWeAre';
import WhatWeDo from '../web-pages/What-We-Do/WhatWeDo';
import NewsCareer from '../web-pages/News-Careers/NewsCareers';
import ImageSliderDetails from '../admin-pages/Dashboard/ImageSliderDetails/ImageSliderDetails';
import News from '../admin-pages/News/News';
import NewsDetails from '../admin-pages/News/NewsDetails/NewsDetails';
import Career from '../admin-pages/Careers/Career';
import CareerDetails from '../admin-pages/Careers/CareerDetails/CareerDetails';

export default function Router(props) {
    return (
        <Routes>
            <Route path="/" element={<WebsiteLayout />}>
                <Route index element={<Home />} />
                <Route path="who-we-are" element={<WhoWeAre />} />
                <Route path="what-we-do">
                    <Route path="" index element={<WhatWeDo />} />
                    <Route path=":id/:title" element={<WhatWeDo />} />
                </Route>
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
                <Route path="image-slides">
                    <Route path="" index element={<Dashboard />} />
                    <Route path=":id" element={<ImageSliderDetails />} />
                </Route>
                <Route path="projects">
                    <Route path="" index element={<Project />} />
                    <Route path=":id/:title" element={<ProjectDetails />} />
                </Route>
                <Route path="news">
                    <Route path="" index element={<News />} />
                    <Route path=":id/:title" element={<NewsDetails />} />
                </Route>
                <Route path="careers">
                    <Route path="" index element={<Career />} />
                    <Route path=":id/:title" element={<CareerDetails />} />
                </Route>
                <Route path="messages">
                    <Route path="" index element={<Message />} />
                    <Route path=":id" element={<MessageDetails />} />
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
