import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import {
    faHome,
    faDiagramProject,
    faNewspaper,
    faCartFlatbedSuitcase,
    faMessage,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export function Layout() {
    const menuList = [
        {
            name: "Home",
            link: "/admin/home",
            icon: faHome,
        },
        {
            name: "Projects",
            link: "/admin/projects",
            icon: faDiagramProject,
        },
        {
            name: "News",
            link: "/admin/news",
            icon: faNewspaper,
        },
        {
            name: "Careers",
            link: "/admin/careers",
            icon: faCartFlatbedSuitcase,
        },
        {
            name: "Messages",
            link: "/admin/messages",
            icon: faMessage,
        },
        {
            name: "Subscribers",
            link: "/admin/subscribers",
            icon: faEnvelope,
        },
    ];

    return (
        <div className="admin-layout">
            <Sidebar menuList={menuList}></Sidebar>
            <div className="main px-lg-4 px-md-4">
                <Header menuList={menuList}></Header>
                <div className="body d-flex py-3">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}
