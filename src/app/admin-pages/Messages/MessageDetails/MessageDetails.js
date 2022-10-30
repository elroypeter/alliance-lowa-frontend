import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import { loadMessagesDetails } from '../store/MessageDetails.slice';

export default function MessageDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const { isLoading, details } = useSelector((state) => state.messageDetails);

    useEffect(() => {
        dispatch(loadMessagesDetails(params.id));
    }, []);

    return (
        <div className="container-xxl">
            <div className="row clearfix g-3">
                <div className="col-sm-12">
                    <div className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                            <h6 className="m-0 fw-bold">Message Details</h6>
                        </div>
                        <div className="card-body">
                            {isLoading ? (
                                <BsSpinner />
                            ) : (
                                <div>
                                    <h6>
                                        <strong>Name</strong>
                                    </h6>
                                    <p>{details.name}</p>
                                    <h6>
                                        <strong>Email</strong>
                                    </h6>
                                    <p>{details.email}</p>
                                    <h6>
                                        <strong>Mobile</strong>
                                    </h6>
                                    <p>{details.mobile}</p>
                                    <h6>
                                        <strong>Message</strong>
                                    </h6>
                                    <p>{details.message}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
