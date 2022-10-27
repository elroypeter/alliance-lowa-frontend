import React, { useEffect } from 'react';
import { baseUrl } from '../../services/ApiService';
import { getImageName } from '../../utils/externals.util';

import { loadSliders } from './store/Home.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';

export default function Slider() {
    const dispatch = useDispatch();
    const { sliders } = useSelector((store) => store.homeSlider);
    const { selectedLanguage } = useSelector((store) => store.language);

    useEffect(() => {
        dispatch(loadSliders({ langCode: selectedLanguage, isPublished: true }));
    }, [selectedLanguage]);

    return (
        <div className="container-fluid p-0 mb-5">
            <Carousel showArrows={true} infiniteLoop={true} showThumbs={false} transitionTime={1500}>
                {sliders.map((slide, index) => (
                    <div key={index} className="owl-carousel-item position-relative">
                        <img className="img-fluid" src={baseUrl() + '/images' + getImageName(slide.filePath)} alt="" />
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                            style={{
                                background: 'rgb(53 53 53 / 22%)',
                            }}
                        >
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-8 text-center">
                                        <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                                            Welcome To <span className="text-secondary">Alliance</span>
                                            <span className="text-primary">Lowa</span>
                                        </h5>
                                        <h1 className="display-3 text-white animated slideInDown mb-4">{slide.title}</h1>
                                        <p className="fs-5 fw-medium text-white mb-4 pb-2">{slide.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
