import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loadSubcribers, deleteSubcribers } from './store/Subscriber.slice';
import BsSpinner from '../../components/Spinner/BsSpinner';

export default function Subscriber() {
    const dispatch = useDispatch();
    const { isLoading, subscribers } = useSelector((state) => state.subscriber);

    useEffect(() => {
        dispatch(loadSubcribers());
    }, []);

    return (
        <div className="container-xxl">
            <div className="row clearfix g-3">
                <div className="col-sm-12">
                    <div className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                            <h6 className="m-0 fw-bold">Subscriber List</h6>
                        </div>
                        <div className="card-body">
                            {isLoading ? (
                                <BsSpinner />
                            ) : (
                                <table id="projectsTable" className="table table-hover" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscribers.map((sub, index) => (
                                            <tr key={index}>
                                                <td>{parseInt(index) + 1}</td>
                                                <td>{sub.email}</td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                                                        <button
                                                            onClick={() => dispatch(deleteSubcribers(sub.id))}
                                                            type="button"
                                                            className="btn btn-outline-light"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} className="text-danger" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
