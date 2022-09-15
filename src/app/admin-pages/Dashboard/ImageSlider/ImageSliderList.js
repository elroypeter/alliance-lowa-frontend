import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ImageSlider from "./ImageSlider";
import ImageSliderForm from "./ImageSliderForm";

export default class ImageSliderList extends Component {
    state = {
        images: [],
        openModal: false,
        editModal: false,
    };

    newSlider = () => {
        const currentState = Object.assign({}, this.state);
        currentState.openModal = true;
        this.setState(currentState);
    };

    editSlider = () => {};

    closeModal = () => {
        const currentState = Object.assign({}, this.state);
        currentState.openModal = false;
        this.setState(currentState);
    };

    render() {
        return (
            <div className="row mb-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                            <h6 className="m-0 fw-bold">Image Slider</h6>
                            <div className="report ms-3">
                                <button
                                    className="btn btn-sm btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#newSlider"
                                    onClick={this.newSlider}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="me-2"
                                    />
                                    New Image Slide
                                </button>
                                <ImageSliderForm
                                    editModal={this.state.editModal}
                                    closeModal={this.closeModal}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {this.state.images.map((image, index) => (
                                    <ImageSlider key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
