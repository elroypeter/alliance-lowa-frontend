import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faPhone,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
    faTwitter,
    faFacebookF,
    faYoutube,
    faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Address() {
    const socialLinks = [
        {
            icon: faTwitter,
            link: "",
        },
        {
            icon: faFacebookF,
            link: "",
        },
        {
            icon: faYoutube,
            link: "",
        },
        {
            icon: faLinkedinIn,
            link: "",
        },
    ];
    return (
        <div className="col-lg-4 col-md-6">
            <h4 className="text-light mb-4">Address</h4>
            <p className="mb-2">
                <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="me-3"
                ></FontAwesomeIcon>
                Sis Avenue Bamwisho, Province of North Kivu, Congo DRC
            </p>
            <p className="mb-2">
                <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="me-3"
                ></FontAwesomeIcon>
                {"Logu (ABM camp), Road leading to Bisie - Walikale, Congo DRC"}
            </p>
            <p className="mb-2">
                <FontAwesomeIcon
                    icon={faPhone}
                    className="fa fa-phone-alt me-3"
                ></FontAwesomeIcon>
                +000 000 0000
            </p>
            <p className="mb-2">
                <FontAwesomeIcon
                    icon={faEnvelope}
                    className="fa fa-envelope me-3"
                ></FontAwesomeIcon>
                info@alliancelowa.org
            </p>
            <div className="d-flex pt-2">
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        className="btn btn-outline-light btn-social"
                        href=""
                    >
                        <FontAwesomeIcon
                            icon={link.icon}
                            className="fab fa-twitter"
                        ></FontAwesomeIcon>
                    </a>
                ))}
            </div>
        </div>
    );
}
