import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function ContactMap() {
    return (
        <div className="container-fluid bg-light overflow-hidden mb-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div
                        className="col-lg-6 ps-lg-0"
                        style={{ minHeight: "400px" }}
                    >
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src="/assets/images/defaults/map.png"
                                style={{ objectFit: "cover" }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div
                        className="col-lg-6 about-text py-5 wow fadeIn"
                        data-wow-delay="0.5s"
                        style={{
                            visibility: "visible",
                            animationDelay: "0.5s",
                            animationName: "fadeIn",
                        }}
                    >
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">
                                    Where to find us
                                </h1>
                            </div>
                            <p className="mb-4 pb-2">
                                To contact us, write to us at the following
                                address;
                                <a href="mailto:info@alliancelowa.org">
                                    info@alliancelowa.org
                                </a>{" "}
                                Or come and visit us at the addresses below:
                            </p>
                            <div className="row g-4 mb-4 pb-2">
                                <div
                                    className="col-sm-12 wow fadeIn"
                                    data-wow-delay="0.1s"
                                    style={{
                                        visibility: "visible",
                                        animationDelay: "0.5s",
                                        animationName: "fadeIn",
                                    }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faLocationDot}
                                                className="fa-2x text-primary"
                                            />
                                        </div>
                                        <div className="ms-3">
                                            <h2
                                                className="text-primary mb-1"
                                                data-toggle="counter-up"
                                            >
                                                Address 1
                                            </h2>
                                            <p className="fw-medium mb-0">
                                                Sis Avenue Bamwisho, Quartier
                                                Kisima, Commune of Walikale in
                                                Walikale center, Territory of
                                                Walikale, Province of North
                                                Kivu, Congo DRC
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-sm-12 wow fadeIn"
                                    data-wow-delay="0.3s"
                                    style={{
                                        visibility: "visible",
                                        animationDelay: "0.5s",
                                        animationName: "fadeIn",
                                    }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faLocationDot}
                                                className="fa-2x text-primary"
                                            />
                                        </div>
                                        <div className="ms-3">
                                            <h2
                                                className="text-primary mb-1"
                                                data-toggle="counter-up"
                                            >
                                                Address 2
                                            </h2>
                                            <p className="fw-medium mb-0">
                                                At Logu (ABM camp) Sis Crossing
                                                of the National N° 3 and the
                                                road leading to Bisie/ Walikale/
                                                Congo DRC
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
