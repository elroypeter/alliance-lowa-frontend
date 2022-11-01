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
                src: 'https://doc-0o-58-docs.googleusercontent.com/docs/securesc/d1fvfdck3jhr19btmfeq7s14n5fk0d1q/2mflsd7vuk2onl6pvn8qiri9nurnvsc5/1667137350000/03091743351567581984/10627917215050908220/1m_r4O_BcsGghCT8XIznfsHfHMeKXzqpK?e=download&ax=ALW9-sAFxSb4YVXkz4oiLIeXo9X_5LgSu7ErLcdI3T6rb5jJA9DQ7BCeog2iVZmvHcsT2aCpmvMDplmSk54VNEUVB2oYHorpfzl3of9vsO5V1YXc-F2XGvjsCE3psMNDtVAFoDt3GXGNk17sQnpa31LDcWj90gLQHb-1NyzxI7beqjwA5xfXh2CXWm5fJOy-A-ju48W5dtRqwq1lZaJQXZwHadzfgbQL1UMRHhARw17nzo9pzUAgCSdcoFC6sU2ySvEd8-yKX2cc6G811CEIoYLojj0coS1j72woLkCn0eoJnBEB3ReC4ZgBxqG0GccIZ5QFAY8vWOnIKgvoyfyN4jCEpEXYxCyfDHBTNh76uD4I7G_S_p8UUUvOmSM4LPnxO5GCBQTzpFAF7IlmhJUSlkOrlGmr3zhhbw1ircbzQTyH8EnUQVy6lp9rcjdGCu9efy2uZGxtx8hw2rmRwSn-PPdNqAqvMHTzC0UM_rkXe2UtP3U-cEyCdQ20Pi3i3RYUcBW3B77kdo-ImVhjF_47tgECHalsZQU9d5LEJ6YrGHsiw04sAjUON9787jQwwkkvW2PBEdfShEAHfai_Aypkou2tHYrlJrbVdJeQWfQKx77HZRWoRbEXJrmyIQF04puEPtQ-4kR2QQYOnmm6aq4c3DZBPGOOLlwr1xuRfzsm65tEgb5lRloTY_1lA-aWSk5mOyLwvWz1QRyqXRmD3oULfKULQYn3Q3SPk60evqT0sw2p4ohE5XdsjniJhuTl930LDz51BKXGnUmgFFh9TR0n0pDxZZORQ6-PMVyPXDwF6PKc-MsgzNBqlLb8TAonny0UD_fqISchZx6M4FwbzBG1GL5GXWn3n8hn446CmhBpBGpVGQQg73z8RoCMXTe-OCFTMhK36cZEKGEHkk29MNcDTHSufwBkHsqyBoW_fBRwjpoXLYoAy1j816E6fhgfN-hPz8--K2mXN_ssyL0X&uuid=f9a37266-cff5-45dc-b3ec-806568f26a40&authuser=0&nonce=70canegmqpkn4&user=10627917215050908220&hash=i1jm2rtjknlbr24nmkjpb9s48ra92671',
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
