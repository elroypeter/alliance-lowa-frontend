import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loadCareerDetails, updateCareerDetails, closeOpenModal, editCareerDetails } from '../store/CareerDetails.slice';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import CareerForm from '../CareerList/CareerForm';
import HTMLReactParser from 'html-react-parser';

export default function CareerDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const { isLoading, details, isModalOpen, isModalEdit } = useSelector((state) => state.careerDetails);

    useEffect(() => {
        dispatch(loadCareerDetails({ id: params.id }));
    }, []);

    useEffect(() => {
        if (!isModalOpen) closeModal();
    }, [isModalOpen]);

    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                title: '',
                description: '',
            },
            errors: {},
        },
    });

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
        currentState.form = resetForm();
        document.getElementById('closeCareerModal').click();
        setState(currentState);
    };

    const editCareer = (data) => {
        const currentState = Object.assign({}, state);
        currentState.form.fields = data;
        dispatch(editCareerDetails());
        setState(currentState);
        document.getElementById('newCareerModalBtn').click();
    };

    return (
        <div className="container-xxl">
            <div className="row mb-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                            <h6 className="m-0 fw-bold">Career Details</h6>
                            <div className="ms-auto report ms-3 w-80">
                                <button
                                    onClick={() => {
                                        editCareer(details);
                                    }}
                                    type="button"
                                    className="btn btn-primary btn-sm w-sm-100"
                                >
                                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                                    Edit
                                </button>
                                <button
                                    hidden={true}
                                    type="button"
                                    id="newCareerModalBtn"
                                    className="btn btn-primary btn-sm w-sm-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addCareerModal"
                                ></button>
                                <CareerForm
                                    form={state.form}
                                    editModal={isModalEdit}
                                    onInputChange={onInputChange}
                                    updateCareer={() => {
                                        dispatch(updateCareerDetails({ id: state.form.fields.id, data: state.form.fields }));
                                    }}
                                    closeModal={() => {
                                        dispatch(closeOpenModal());
                                    }}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            {isLoading ? (
                                <BsSpinner />
                            ) : (
                                <div className="row">
                                    <div className="col-md-12 col-12">
                                        <h6>
                                            <strong>Title</strong>
                                        </h6>
                                        <p>{details.title}</p>
                                        <h6>
                                            <strong>Description</strong>
                                        </h6>
                                        <div>{HTMLReactParser(details.description || '')}</div>
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
