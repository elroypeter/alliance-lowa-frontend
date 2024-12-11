import React, { useRef } from 'react';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { useTranslation } from 'react-i18next';

export default function OurHistory() {
    const { t } = useTranslation();

    const playerRef = useRef(null);
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fill: true,
        poster: '/assets/images/development/allowa4.jpg',
        sources: [
            {
                src: 'https://www.youtube.com/watch?v=voFRslp8d60',
                type: 'video/youtube',
            },
        ],
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            console.warn('player is waiting');
        });

        player.on('dispose', () => {
            console.warn('player will dispose');
        });
    };

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div className="col-lg-6 ps-lg-0" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
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
