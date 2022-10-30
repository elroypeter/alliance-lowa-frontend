import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Projects() {
    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div className="col-lg-6 ps-lg-0" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src="/assets/images/development/allowa1.JPG"
                                style={{ objectFit: 'cover' }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">Our Programs</h1>
                            </div>
                            <p className="mb-4 pb-2">Alliance Lowa Asbl works on the following 4 programmatic areas:</p>
                            <ul className="project-list mb-4">
                                <li className="project">
                                    <FontAwesomeIcon icon={faCheck} className="me-2 text-primary" />
                                    <div>Local Economic Development</div>
                                </li>
                                <li className="project">
                                    <FontAwesomeIcon icon={faCheck} className="me-2 text-primary" />
                                    <div>Program Wash, Health and Environment</div>
                                </li>
                                <li className="project">
                                    <FontAwesomeIcon icon={faCheck} className="me-2 text-primary" />
                                    <div>Program Socio-Community Cohesion</div>
                                </li>
                                <li className="project">
                                    <FontAwesomeIcon icon={faCheck} className="me-2 text-primary" />
                                    <div>Program Education Program</div>
                                </li>
                            </ul>
                            <a className="btn btn-primary py-3 px-5">Explore More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
