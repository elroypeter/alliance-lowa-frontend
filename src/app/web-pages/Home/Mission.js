import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Mission() {
    const { t } = useTranslation();

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div className="col-lg-6 ps-lg-0" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src="assets/images/development/allowa4.jpg"
                                style={{ objectFit: 'cover' }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">{t('vision_and_mission')}</h1>
                            </div>
                            <p className="mb-4 pb-2">{t('vision_sub_1')}</p>
                            <p>{t('vision_sub_2')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
