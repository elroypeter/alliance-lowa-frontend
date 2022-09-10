import React from "react";

export default function Mission() {
    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div
                        className="col-lg-6 ps-lg-0"
                        style={{ minHeight: "400px" }}
                    >
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src="assets/images/development/vision.jpeg"
                                style={{ objectFit: "cover" }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div
                        className="col-lg-6 about-text py-5 wow fadeIn"
                        data-wow-delay="0.5s"
                    >
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">
                                    Vision & Mission
                                </h1>
                            </div>
                            <p className="mb-4 pb-2">
                                Alliance Lowa {"Asbl's"} vision is to become a
                                reference organization for the promotion of
                                community development in the territory of
                                Walikale
                            </p>
                            <p>
                                The mission of the association is to promote and
                                support the development of local communities
                                around the spaces and activities of mining in
                                {"M'pama"} Bisie in particular and in the
                                Walikale Territory in general. Since its
                                establishment, the association has carried out
                                several projects in favor of the communities in
                                the sectors of agriculture, education; economic
                                growth and social cohesion.
                            </p>
                            <a href="" className="btn btn-primary py-3 px-5">
                                Explore More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
