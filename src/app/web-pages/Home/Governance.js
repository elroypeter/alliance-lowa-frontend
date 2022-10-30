import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserCheck, faDraftingCompass, faHeadphones } from '@fortawesome/free-solid-svg-icons';

export default function Governance() {
    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container feature px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 ps-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">Our Governance</h1>
                            </div>
                            <p className="mb-4 pb-2">
                                The organization is managed on a daily basis by General Management. This implements the decisions of the Board of
                                Directors and provides appropriate guidance for the smooth running of the organization. For more information, please
                                contact the General Management Secretariat.
                            </p>
                            <p>Alliance Lowa has the following governance bodies:</p>
                            <div className="row g-4">
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCheck} className="fa-2x text-primary"></FontAwesomeIcon>
                                        </div>
                                        <div className="ms-4">
                                            <h5 className="mb-0">The College of Founders</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faUserCheck} className="fa-2x text-primary"></FontAwesomeIcon>
                                        </div>
                                        <div className="ms-4">
                                            <h5 className="mb-0">The General Assembly</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faDraftingCompass} className="fa-2x text-primary"></FontAwesomeIcon>
                                        </div>
                                        <div className="ms-4">
                                            <h5 className="mb-0">The Board of Directors</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faHeadphones} className="fa-2x text-primary"></FontAwesomeIcon>
                                        </div>
                                        <div className="ms-4">
                                            <h5 className="mb-0">The General Management</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 pe-lg-0" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src="assets/images/development/allowa2.JPG"
                                style={{ objectFit: 'cover' }}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
