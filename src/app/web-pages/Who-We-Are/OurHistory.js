import React from 'react';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

export default function OurHistory() {
    const { t } = useTranslation();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const videoJsOptions = {
        height: isTabletOrMobile ? 200 : 360,
        width: isTabletOrMobile ? 310 : 640,
        controls: true,
        light: true,
    };

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div className="col-lg-6 ps-lg-0 py-5">
                        <div className="p-lg-5 ps-lg-5">
                            <VideoPlayer options={videoJsOptions} url="https://youtu.be/1Urd2qDuKlE" />
                        </div>
                    </div>
                    <div className="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">{t('footer_about_us')}</h1>
                            </div>
                            <p className="mb-3 pb-2">{t('about_desc_1')}</p>
                            <p className="mb-3 pb-2">{t('about_desc_2')}</p>
                            <p className="">{t('about_desc_3')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
