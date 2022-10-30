import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CareerForm from './CareerForm';
import { loadCareers, closeOpenModal, newCareer, saveCareer } from '../store/Career.slice';
import { useDispatch, useSelector } from 'react-redux';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import CareerItem from './CareerItem';

export default function CareerList() {
    const dispatch = useDispatch();
    const { careers, isLoading, isModalOpen } = useSelector((state) => state.career);
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

    useEffect(() => {
        dispatch(loadCareers());
    }, []);

    useEffect(() => {
        if (!isModalOpen) closeModal();
    }, [isModalOpen]);

    useEffect(() => {
        if (careers.length > 0) {
            window?.loadDataTable('careersTable');
        }
    }, [careers]);

    useEffect(() => {
        window?.destroyDataTable('careersTable');
    }, []);

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

    return (
        <>
            <div className="row mb-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                            <h6 className="m-0 fw-bold">Careers List</h6>
                            <div className="ms-auto report ms-3 w-80">
                                <button
                                    onClick={() => dispatch(newCareer())}
                                    type="button"
                                    id="newCareerModalBtn"
                                    className="btn btn-primary btn-sm w-sm-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addCareerModal"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                                    Add Career
                                </button>
                                <CareerForm
                                    form={state.form}
                                    onInputChange={onInputChange}
                                    updateCareer={() => {}}
                                    saveCareer={() => {
                                        dispatch(saveCareer(state.form.fields));
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
                                <table id="careersTable" className="table table-hover" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {careers.map((career, index) => (
                                            <CareerItem key={index} index={index} career={career} editCareer={() => {}} deleteCareer={() => {}} />
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
