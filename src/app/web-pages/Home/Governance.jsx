import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserCheck, faDraftingCompass, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function Governance() {
    const { t } = useTranslation();

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container feature px-lg-0">
                <div className="row g-0 mx-lg-0 align-items-stretch">
                    <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 ps-lg-0 h-100 d-flex flex-column">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">{t('gov_header')}</h1>
                            </div>
                            <p className="mb-4 pb-2">{t('gov_description')}</p>
                            <p>{t('gov_bodies')}</p>
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
                                            <h5 className="mb-0">{t('gov_founder')}</h5>
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
                                            <h5 className="mb-0">{t('gov_general')}</h5>
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
                                            <h5 className="mb-0">{t('gov_board')}</h5>
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
                                            <h5 className="mb-0">{t('gov_manage')}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 pe-lg-0 d-flex">
                        <div className="position-relative w-100" style={{ height: '100%', minHeight: '100%' }}>
                            <img
                                className="img-fluid w-100 h-100"
                                src="assets/images/development/allowa2.JPG"
                                style={{ objectFit: 'cover', height: '100%' }}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
