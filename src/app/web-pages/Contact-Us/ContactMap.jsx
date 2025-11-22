import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function ContactMap() {
    const { t } = useTranslation();

    return (
        <div className="container-fluid bg-light overflow-hidden mb-5 px-lg-0">
            <div className="container contact-map-section px-lg-0">
                <div className="row g-0 mx-lg-0 align-items-stretch">
                    <div className="col-lg-6 ps-lg-0 d-flex">
                        <div className="position-relative w-100" style={{ height: '100%', minHeight: '100%' }}>
                            <img
                                className="img-fluid w-100 h-100"
                                src="/assets/images/defaults/map.png"
                                style={{ objectFit: 'cover', height: '100%' }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div
                        className="col-lg-6 about-text py-5 wow fadeIn"
                        data-wow-delay="0.5s"
                        style={{
                            visibility: 'visible',
                            animationDelay: '0.5s',
                            animationName: 'fadeIn',
                        }}
                    >
                        <div className="p-lg-5 pe-lg-0 h-100 d-flex flex-column">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">{t('contact_where')}</h1>
                            </div>
                            <p className="mb-4 pb-2">
                                {t('contact_sub_title_1')}
                                <a href="mailto:info@alliancelowa.org">info@alliancelowa.org</a>
                                {t('contact_sub_title_2')}
                            </p>
                            <div className="row g-4 mb-4 pb-2">
                                <div
                                    className="col-sm-12 wow fadeIn"
                                    data-wow-delay="0.1s"
                                    style={{
                                        visibility: 'visible',
                                        animationDelay: '0.5s',
                                        animationName: 'fadeIn',
                                    }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faLocationDot} className="fa-2x text-primary" />
                                        </div>
                                        <div className="ms-3">
                                            <h2 className="text-primary mb-1" data-toggle="counter-up">
                                                {t('footer_address')} 1
                                            </h2>
                                            <p className="fw-medium mb-0">
                                                Sis Avenue Bamwisho, Quartier Kisima, Commune of Walikale in Walikale center, Territory of Walikale,
                                                Province of North Kivu, Congo DRC
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-sm-12 wow fadeIn"
                                    data-wow-delay="0.3s"
                                    style={{
                                        visibility: 'visible',
                                        animationDelay: '0.5s',
                                        animationName: 'fadeIn',
                                    }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white"
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faLocationDot} className="fa-2x text-primary" />
                                        </div>
                                        <div className="ms-3">
                                            <h2 className="text-primary mb-1" data-toggle="counter-up">
                                                {t('footer_address')} 2
                                            </h2>
                                            <p className="fw-medium mb-0">
                                                At Logu (ABM camp) Sis Crossing of the National N° 3 and the road leading to Bisie/ Walikale/ Congo
                                                DRC
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
