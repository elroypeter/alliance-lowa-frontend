import React, { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sliderContent } from "./SliderContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Slider() {
    useEffect(() => {
        window?.headerCarousel(
            [faChevronLeft, faChevronRight].map((arrow, index) =>
                renderToStaticMarkup(
                    <FontAwesomeIcon key={index} icon={arrow}></FontAwesomeIcon>
                )
            )
        );
    });

    return (
        <div className="container-fluid p-0 mb-5">
            <div className="owl-carousel header-carousel position-relative">
                {sliderContent.map((slide, index) => (
                    <div
                        key={index}
                        className="owl-carousel-item position-relative"
                    >
                        <img className="img-fluid" src={slide.imgURL} alt="" />
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                            style={{ background: "rgb(53 53 53 / 22%)" }}
                        >
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-8 text-center">
                                        <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                                            Welcome To{" "}
                                            <span className="text-secondary">
                                                Alliance
                                            </span>
                                            <span className="text-primary">
                                                Lowa
                                            </span>
                                        </h5>
                                        <h1 className="display-3 text-white animated slideInDown mb-4">
                                            {slide.title}
                                        </h1>
                                        <p className="fs-5 fw-medium text-white mb-4 pb-2">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
