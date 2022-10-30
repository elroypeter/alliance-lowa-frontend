import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadImageSlideDetails,
    newTranslation,
    saveImageTranslation,
    deleteImageTranslation,
    editTranslation,
    closeOpenModal,
    updateTranslation,
} from '../store/ImageSliderDetails.slice';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import ImageSliderForm from '../ImageSlider/ImageSliderForm';

export default function ImageSliderDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const { langs } = useSelector((state) => state.language);
    const { imageSliderDetails, isLoading, isModalOpen, isSaving, isTranslation, isModelEdit } = useSelector((state) => state.imageSliderDetails);

    useEffect(() => {
        dispatch(loadImageSlideDetails(params.id));
    }, []);

    useEffect(() => {
        if (!isModalOpen) closeModal();
    }, [isModalOpen]);

    const [state, setState] = useState({
        tabIndex: 0,
        form: {
            fields: {
                id: '',
                langCode: 'fr',
                title: '',
                description: '',
            },
            errors: {},
        },
    });

    const handleTabChange = (index) => {
        setState((state) => ({ ...state, tabIndex: index }));
    };

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

    const editSliderTranslation = (data) => {
        const currentState = Object.assign({}, state);
        currentState.form.fields = data;
        dispatch(editTranslation());
        setState(currentState);
        document.getElementById('newSliderModalBtn').click();
    };

    const resetForm = () => {
        return {
            fields: {
                id: '',
                langCode: '',
                title: '',
                description: '',
            },
            errors: {},
        };
    };

    return (
        <div className="container-xxl">
            <div className="row mb-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                            <h6 className="m-0 fw-bold">Image Slide Details</h6>
                            <div className="ms-auto report ms-3 w-80">
                                <button
                                    onClick={() => {
                                        dispatch(newTranslation());
                                    }}
                                    id="newSliderModalBtn"
                                    className="btn btn-sm btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#newSlider"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                                    Add Translation
                                </button>
                                <ImageSliderForm
                                    addTranslationModal={isTranslation}
                                    editModal={isModelEdit}
                                    form={state.form}
                                    onInputChange={onInputChange}
                                    saveImage={() => {
                                        dispatch(saveImageTranslation({ id: params.id, data: state.form.fields }));
                                    }}
                                    updateImage={() => {
                                        dispatch(updateTranslation({ id: state.form.fields.id, data: state.form.fields }));
                                    }}
                                    closeModal={() => dispatch(closeOpenModal())}
                                    savingStatus={isSaving}
                                    currentLangs={isTranslation ? imageSliderDetails?.translations?.map(({ langCode }) => langCode) : undefined}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            {isLoading ? (
                                <BsSpinner />
                            ) : (
                                <div className="row">
                                    <div className="col-md-12 col-12 d-flex">
                                        <nav>
                                            <div className="nav nav-pills mb-3 flex-column" id="nav-tab" role="tablist">
                                                {imageSliderDetails?.translations?.map(({ langCode }, index) => (
                                                    <button
                                                        onClick={() => handleTabChange(index)}
                                                        key={index}
                                                        className={`nav-link ${index === state.tabIndex ? 'active' : ''}`}
                                                        id={`nav-${langs[langCode].name}-tab`}
                                                        data-bs-toggle="tab"
                                                        data-bs-target={`#nav-${langs[langCode].name}`}
                                                        type="button"
                                                        role="tab"
                                                        aria-controls={`nav-${langs[langCode].name}`}
                                                        aria-selected="true"
                                                    >
                                                        {langs[langCode].name}
                                                    </button>
                                                ))}
                                            </div>
                                        </nav>
                                        <div className="tab-content p-3 border bg-light ms-2 w-100" id="nav-tabContent">
                                            {imageSliderDetails?.translations?.map((trans, index) => (
                                                <div
                                                    key={index}
                                                    className={`tab-pane fade position-relative ${state.tabIndex === index ? 'active show' : ''}`}
                                                    id={`#nav-${langs[trans.langCode].name}`}
                                                    role="tabpanel"
                                                    aria-labelledby={`nav-${langs[trans.langCode].name}-tab`}
                                                >
                                                    <h6>
                                                        <strong>Title</strong>
                                                    </h6>
                                                    <p>{trans.title}</p>
                                                    <h6>
                                                        <strong>Description</strong>
                                                    </h6>
                                                    <p>{trans.description}</p>
                                                    <div className="position-absolute" style={{ right: '0px', top: '5px' }}>
                                                        <button
                                                            className="btn dropdown-toggle"
                                                            role="button"
                                                            data-bs-toggle="dropdown"
                                                            data-bs-display="static"
                                                            aria-expanded="false"
                                                        >
                                                            <FontAwesomeIcon icon={faEllipsis} />
                                                        </button>
                                                        <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                                                            <div className="card border-0 w280">
                                                                <div className="list-group m-2">
                                                                    <a
                                                                        onClick={() => {
                                                                            editSliderTranslation(trans);
                                                                        }}
                                                                        className="list-group-item list-group-item-action border-0 "
                                                                    >
                                                                        <FontAwesomeIcon icon={faEdit} className="me-3" />
                                                                        Edit
                                                                    </a>
                                                                    {index !== 0 && (
                                                                        <a
                                                                            onClick={() => {
                                                                                dispatch(deleteImageTranslation(trans.id));
                                                                                handleTabChange(0);
                                                                            }}
                                                                            className="list-group-item list-group-item-action border-0 "
                                                                        >
                                                                            <FontAwesomeIcon icon={faTrash} className="me-3" />
                                                                            Delete
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
