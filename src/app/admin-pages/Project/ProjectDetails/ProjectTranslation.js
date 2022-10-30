import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsis, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import ProjectForm from '../ProjectList/ProjectForm';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import HTMLReactParser from 'html-react-parser';
import {
    saveProjectTranslation,
    newTranslation,
    editTranslation,
    deleteProjectTranslation,
    updateProjectTranslation,
} from '../store/ProjectDetails.slice';

export default function ProjectTranslation() {
    const dispatch = useDispatch();
    const { langs } = useSelector((state) => state.language);
    const { details, isLoading, isModalOpen, isModalEdit, isTranslation } = useSelector((state) => state.projectDetails);
    const [state, setState] = useState({
        tabIndex: 0,
        form: {
            fields: {
                id: '',
                title: '',
                description: '',
            },
            errors: {},
        },
    });

    useEffect(() => {
        if (!isModalOpen) closeModal();
    }, [isModalOpen]);

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

    const resetForm = () => {
        return {
            fields: {
                id: '',
                title: '',
                description: '',
            },
            errors: {},
        };
    };

    const closeModal = () => {
        const currentState = Object.assign({}, state);
        currentState.newImage = resetForm();
        document.getElementById('closeProjectModal').click();
        setState(currentState);
    };

    const editSliderTranslation = (data) => {
        const currentState = Object.assign({}, state);
        currentState.form.fields = data;
        dispatch(editTranslation());
        setState(currentState);
        document.getElementById('addTranslation').click();
    };

    return (
        <div className="row g-3 mb-3">
            <div className="col-12">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                        <h6 className="m-0 fw-bold">Project Translations</h6>
                        <div className="col-auto d-flex w-sm-100 mt-2 mt-sm-0">
                            <button
                                type="button"
                                id="addTranslation"
                                data-bs-toggle="modal"
                                data-bs-target="#addProjectModal"
                                className="btn btn-sm w-sm-100 btn-primary"
                                onClick={() => {
                                    dispatch(newTranslation());
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} className="me-2" />
                                Add Translation
                            </button>
                            <ProjectForm
                                addTranslationModal={isTranslation}
                                editModal={isModalEdit}
                                form={state.form}
                                onInputChange={onInputChange}
                                updateProject={() => {
                                    dispatch(updateProjectTranslation({ id: state.form.fields.id, data: state.form.fields }));
                                }}
                                saveProject={() => {
                                    dispatch(saveProjectTranslation({ id: details.id, data: state.form.fields }));
                                }}
                                closeModal={() => {}}
                                currentLangs={isTranslation ? details?.translations?.map(({ langCode }) => langCode) : undefined}
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
                                            {details?.translations?.map(({ langCode }, index) => (
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
                                        {details?.translations?.map((trans, index) => (
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
                                                <div>{HTMLReactParser(trans.description || '')}</div>

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
                                                                            dispatch(deleteProjectTranslation(trans.id));
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
    );
}
