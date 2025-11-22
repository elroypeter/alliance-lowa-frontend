import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function Projects() {
    const { t } = useTranslation();

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-0 align-items-stretch">
                    <div className="col-lg-6 ps-lg-0 d-flex">
                        <div className="position-relative w-100" style={{ height: '100%', minHeight: '100%' }}>
                            <img
                                className="img-fluid w-100 h-100"
                                src="/assets/images/development/allowa1.JPG"
                                style={{ objectFit: 'cover', height: '100%' }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 pe-lg-0 h-100 d-flex flex-column">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">{t('Our Programs')}</h1>
                            </div>
                            <p className="mb-4 pb-2">{t('prog_description')}</p>
                            <ul className="project-list mb-4">
                                <li className="project">
                                    <FontAwesomeIcon icon={faCheck} className="me-2 text-primary" />
                                    <div>{t('prog_list_local')}</div>
                                </li>
                                <li className="project">
                                    <FontAwesomeIcon icon={faCheck} className="me-2 text-primary" />
                                    <div>{t('prog_list_wash')}</div>
                                </li>
                                <li className="project">
                                    <FontAwesomeIcon icon={faCheck} className="me-2 text-primary" />
                                    <div>{t('prog_list_socio')}</div>
                                </li>
                                <li className="project">
                                    <FontAwesomeIcon icon={faCheck} className="me-2 text-primary" />
                                    <div>{t('prog_list_educ')}</div>
                                </li>
                            </ul>
                            <a className="btn btn-primary py-3 px-5">{t('expore_more')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
