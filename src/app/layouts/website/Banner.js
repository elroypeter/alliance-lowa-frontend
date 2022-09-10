import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export default function Banner() {
    return (
        <div className="container-fluid bg-light p-0">
            <div className="row gx-0 d-none d-lg-flex">
                <div className="col-lg-7 px-5 text-start">
                    <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="text-primary me-2"
                        ></FontAwesomeIcon>
                        <small>
                            Sis Avenue Bamwisho, North Kivu, Congo DRC
                        </small>
                    </div>
                    <div className="h-100 d-inline-flex align-items-center py-3">
                        <FontAwesomeIcon
                            icon={faClock}
                            className="text-primary me-2"
                        ></FontAwesomeIcon>
                        <small>Mon - Fri : 08.00 AM - 06.00 PM</small>
                    </div>
                </div>
                <div className="col-lg-5 px-5 text-end">
                    <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                        <FontAwesomeIcon
                            icon={faPhone}
                            className="text-primary me-2"
                        ></FontAwesomeIcon>
                        <small>+000 000 0000</small>
                    </div>
                    <div className="h-100 d-inline-flex align-items-center translate">
                        <div id="google_translate_element"></div>
                        <div id="translationDetector" hidden>
                            English
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
