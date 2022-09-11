import React from "react";
import Logo from "./Logo";
import SideULink from "./SideULink";

export default function Sidebar(props) {
    return (
        <div
            className="sidebar px-4 py-4 py-md-5 me-0"
            style={{ overflow: "scroll" }}
        >
            <div className="d-flex flex-column h-100">
                <Logo></Logo>
                <SideULink menuList={props.menuList}></SideULink>
            </div>
        </div>
    );
}
