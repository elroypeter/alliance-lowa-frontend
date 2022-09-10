import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function BackTop() {
    useEffect(() => {
        window?.backToTop();
    });

    return (
        <a className="btn btn-lg btn-primary btn-lg-square rounded-0 back-to-top">
            <FontAwesomeIcon
                icon={faArrowUp}
                className="bi bi-arrow-up"
            ></FontAwesomeIcon>
        </a>
    );
}
