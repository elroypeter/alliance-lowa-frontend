import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ImageSlider from './ImageSlider';
import ImageSliderForm from './ImageSliderForm';

import { getImageSlider, deleteImageSlider, publishImageSlider, saveImageSlider, updateImageSlider } from './ImageSlider.service';

export default class ImageSliderList extends Component {
    state = {
        images: [],
        openModal: false,
        editModal: false,
        form: {
            fields: {
                id: '',
                image: '',
                title: '',
                description: '',
            },
            errors: {},
            saving: false,
        },
    };

    componentDidMount() {
        this.modalBtn = document.getElementById('newSliderModalBtn');
        setTimeout(() => this.getImages());
    }

    getImages = () => {
        getImageSlider()
            .then((res) => {
                this.setState((state) => ({ ...state, images: res.data }));
            })
            .catch(console.error());
    };

    saveImage = () => {
        this.setState((state) => ({
            ...state,
            form: { ...state.form, saving: true },
        }));
        saveImageSlider(this.state.form.fields)
            .then(() => {
                this.getImages();
                this.closeModal();
                document.getElementById('closeSliderModal').click();
            })
            .catch(console.error);
    };

    updateImage = (id) => {
        updateImageSlider(id, this.state.form.fields)
            .then(() => {
                this.getImages();
                this.closeModal();
                document.getElementById('closeSliderModal').click();
            })
            .catch(console.error);
    };

    deleteImage = (id) => {
        deleteImageSlider(id)
            .then(() => {
                this.getImages();
            })
            .catch(console.error);
    };

    publishImage = (id, status) => {
        publishImageSlider(id, status)
            .then(() => {
                this.getImages();
            })
            .catch(console.error);
    };

    newSliderModal = () => {
        const currentState = Object.assign({}, this.state);
        currentState.openModal = true;
        this.setState(currentState);
        this.modalBtn.click();
    };

    onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, this.state.form.fields);
        const errors = Object.assign({}, this.state.form.errors);

        fields[name] = value;
        errors[name] = error;

        this.setState((state) => ({ ...state, form: { fields, errors } }));
    };

    resetForm = () => {
        return {
            fields: {
                id: '',
                image: '',
                title: '',
                description: '',
            },
            errors: {},
            saving: false,
        };
    };

    editSlider = (data) => {
        const currentState = Object.assign({}, this.state);
        currentState.openModal = true;
        currentState.editModal = true;
        currentState.form.fields = data;
        this.setState(currentState);
        this.modalBtn.click();
    };

    closeModal = () => {
        const currentState = Object.assign({}, this.state);
        currentState.openModal = false;
        currentState.editModal = false;
        currentState.form = this.resetForm();
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
                                <button id="newSliderModalBtn" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#newSlider">
                                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                                    New Image Slide
                                </button>
                                <ImageSliderForm
                                    editModal={this.state.editModal}
                                    form={this.state.form}
                                    onInputChange={this.onInputChange}
                                    saveImage={this.saveImage}
                                    updateImage={this.updateImage}
                                    closeModal={this.closeModal}
                                    savingStatus={this.state.form.saving}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {this.state.images.map((image, index) => (
                                    <ImageSlider
                                        key={index}
                                        image={image}
                                        deleteImage={this.deleteImage}
                                        publishImage={this.publishImage}
                                        editSlider={this.editSlider}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
