import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewsForm from './NewsForm';
import { loadNews, closeOpenModal, newNews, saveNews } from '../store/News.slice';
import { useDispatch, useSelector } from 'react-redux';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import NewsItem from './NewsItem';

export default function NewsList() {
    const dispatch = useDispatch();
    const { news, isLoading, isModalOpen } = useSelector((state) => state.news);
    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                base64: '',
                title: '',
                langCode: '',
                description: '',
            },
            errors: {},
        },
    });

    useEffect(() => {
        dispatch(loadNews());
    }, []);

    useEffect(() => {
        if (!isModalOpen) closeModal();
    }, [isModalOpen]);

    useEffect(() => {
        if (news.length > 0) {
            window?.loadDataTable('newsTable');
        }
    }, [news]);

    useEffect(() => {
        window?.destroyDataTable('newsTable');
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
                base64: '',
                title: '',
                langCode: '',
                description: '',
            },
            errors: {},
        };
    };

    const closeModal = () => {
        const currentState = Object.assign({}, state);
        currentState.form = resetForm();
        document.getElementById('closeNewsModal').click();
        setState(currentState);
    };

    return (
        <>
            <div className="row mb-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                            <h6 className="m-0 fw-bold">Blog News List</h6>
                            <div className="ms-auto report ms-3 w-80">
                                <button
                                    onClick={() => dispatch(newNews())}
                                    type="button"
                                    id="newNewsModalBtn"
                                    className="btn btn-primary btn-sm w-sm-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addNewsModal"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                                    Add News
                                </button>
                                <NewsForm
                                    form={state.form}
                                    onInputChange={onInputChange}
                                    updateNews={() => {}}
                                    saveNews={() => {
                                        dispatch(saveNews(state.form.fields));
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
                                <table id="newsTable" className="table table-hover" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Languages</th>
                                            <th>Status</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {news.map((news, index) => (
                                            <NewsItem key={index} index={index} news={news} editNews={() => {}} deleteNews={() => {}} />
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
