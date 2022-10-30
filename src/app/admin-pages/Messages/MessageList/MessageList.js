import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import { loadMessages } from '../store/Message.slice';
import MessageItem from './MessageItem';

export default function MessageList() {
    const dispatch = useDispatch();
    const { isLoading, messages } = useSelector((state) => state.message);

    useEffect(() => {
        dispatch(loadMessages());
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            window?.loadDataTable('messageTable');
        }
    }, [messages]);

    useEffect(() => {
        window?.destroyDataTable('messageTable');
    }, []);

    return (
        <div className="row clearfix g-3">
            <div className="col-sm-12">
                <div className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                        <h6 className="m-0 fw-bold">Message List</h6>
                    </div>
                    <div className="card-body">
                        {isLoading ? (
                            <BsSpinner />
                        ) : (
                            <table id="projectsTable" className="table table-hover" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((message, index) => (
                                        <MessageItem key={index} index={index} message={message} />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
