import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import ImageSlider from './ImageSlider';
import ImageSliderForm from './ImageSliderForm';
import { saveImageSlides, loadImageSlides, deleteImageSlide, newImageSlider, closeOpenModal } from '../store/ImageSlider.slice';
import BsSpinner from '../../../components/Spinner/BsSpinner';

export default function ImageSliderList() {
    const dispatch = useDispatch();
    const { images, isLoading, isSaving, isModalOpen } = useSelector((store) => store.imageSlider);
    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                base64: '',
                langCode: 'fr',
                title: '',
                description: '',
            },
            errors: {},
        },
    });

    useEffect(() => {
        dispatch(loadImageSlides());
    }, []);

    useEffect(() => {
        if (!isModalOpen) closeModal();
    }, [isModalOpen]);

    const onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, state.form.fields);
        const errors = Object.assign({}, state.form.errors);
        fields[name] = value;
        errors[name] = error;
        setState((state) => ({ ...state, form: { fields, errors } }));
    };

    const closeModal = () => {
        const currentState = Object.assign({}, state);
        currentState.form = resetForm();
        document.getElementById('closeSliderModal').click();
        setState(currentState);
    };

    const resetForm = () => {
        return {
            fields: {
                id: '',
                base64: '',
                langCode: 'fr',
                title: '',
                description: '',
            },
            errors: {},
        };
    };

    return (
        <div className="row mb-3">
            <div className="col">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                        <h6 className="m-0 fw-bold">Image Slide List</h6>
                        <div className="ms-auto report ms-3 w-80">
                            <button
                                onClick={() => {
                                    dispatch(newImageSlider());
                                }}
                                id="newSliderModalBtn"
                                className="btn btn-sm btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#newSlider"
                            >
                                <FontAwesomeIcon icon={faPlus} className="me-2" />
                                New Image Slide
                            </button>
                            <ImageSliderForm
                                addTranslationModal={state.addTranslationModal}
                                editModal={state.editModal}
                                form={state.form}
                                onInputChange={onInputChange}
                                saveImage={() => {
                                    dispatch(saveImageSlides(state.form.fields));
                                }}
                                closeModal={() => dispatch(closeOpenModal())}
                                savingStatus={isSaving}
                            />
                        </div>
                    </div>
                    <div className="card-body">
                        {isLoading && <BsSpinner />}
                        <div className="row">
                            {images.map((image, index) => (
                                <ImageSlider
                                    key={index}
                                    image={image}
                                    deleteImage={(id) => {
                                        dispatch(deleteImageSlide(id));
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
