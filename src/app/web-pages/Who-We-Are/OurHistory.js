import React, { useRef } from 'react';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

export default function OurHistory() {
    const playerRef = useRef(null);
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fill: true,
        poster: '/assets/images/development/allowa4.jpg',
        sources: [
            {
                src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
                type: 'video/mp4',
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
                                <h1 className="display-5 mb-4">About Us</h1>
                            </div>
                            <p className="mb-3 pb-2">
                                Alliance Lowa is a non-profit association under Congolese law created in Walikale on November 29, 2016, between the
                                Company Alphamin Bisie Mining SA and the local communities bordering the mining site in the territory of Walikale.
                            </p>
                            <p className="mb-3 pb-2">
                                Alliance Lowa Asbl is thus the instrument through which the Alphamin Bisie Mining Company fulfills its legal
                                obligations as well as its social responsibility, in accordance with the Congolese legislation in force with regard to
                                the exploitation of mining resources.
                            </p>
                            <p className="">
                                Alliance Lowa Asbl intends to strengthen the visibility of its interventions and develop solid partnerships with other
                                organizations in order to capture additional resources that can enable it to significantly increase its operational
                                capacity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
