import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const hrefLinks = [
        {
            name: "Home",
            address: "/",
        },
        {
            name: "Who we are",
            address: "/who-we-are",
        },
        {
            name: "What we do",
            address: "/what-we-do",
        },
        {
            name: "News & Careers",
            address: "/new-and-careers",
        },
        {
            name: "Contact Us",
            address: "/contact-us",
        },
    ];
    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
            <div className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                <h2 className="m-0 text-primary">
                    <Link to="/">
                        <img src="assets/images/logo/normal.webp" alt="" />
                    </Link>
                </h2>
            </div>
            <button
                type="button"
                className="navbar-toggler me-4"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    {hrefLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            className="nav-item nav-link"
                            to={link.address}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
                <Link
                    to="/"
                    className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
                >
                    Make Donation
                    <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
                </Link>
            </div>
        </nav>
    );
}
