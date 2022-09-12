import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Breadcrumb(props) {
    let activePage = props.menuList[0];
    return (
        <div className="order-0 col mb-3 mb-md-0 d-flex align-items-center">
            <Link
                to={activePage.link}
                className="menu-toggle-option me-3 text-primary d-flex align-items-center"
            >
                <FontAwesomeIcon icon={activePage.icon} />
            </Link>
            <div className="border-start px-3 flex-fill">
                <span>{activePage.name}</span>
            </div>
        </div>
    );
}
