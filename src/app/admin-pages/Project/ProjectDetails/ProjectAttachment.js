import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import ProjectNewImage from './ProjectNewImage';
import { saveProjectAttachment, newAttachmentModal, closeOpenModal, deleteProjectAttachment } from '../store/ProjectDetails.slice';
import { getImageName } from '../../../utils/externals.util';
import { baseUrl } from '../../../services/ApiService';

export default function ProjectAttachment() {
    const dispatch = useDispatch();
    const { details, isLoading, isModalOpen } = useSelector((state) => state.projectDetails);
    const [state, setState] = useState({
        newImage: {
            fields: {
                base64: '',
                isVideo: false,
            },
            errors: {},
        },
    });

    useEffect(() => {
        if (!isModalOpen) closeModal();
    }, [isModalOpen]);

    const onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, state.newImage.fields);
        const errors = Object.assign({}, state.newImage.errors);
        fields[name] = value;
        errors[name] = error;
        setState((state) => ({ ...state, newImage: { fields, errors } }));
    };

    const resetForm = () => {
        return {
            fields: {
                base64: '',
                isVideo: false,
            },
            errors: {},
        };
    };

    const closeModal = () => {
        const currentState = Object.assign({}, state);
        currentState.newImage = resetForm();
        document.getElementById('closeAttachmentModal').click();
        setState(currentState);
    };

    return (
        <div className="row g-3 mb-3">
            <div className="col-12">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                        <h6 className="m-0 fw-bold">Project Attachments</h6>
                        <div className="col-auto d-flex w-sm-100 mt-2 mt-sm-0">
                            <button
                                type="button"
                                id="addAttachment"
                                data-bs-toggle="modal"
                                data-bs-target="#addAttachmentModal"
                                className="btn btn-sm w-sm-100 btn-primary"
                                onClick={() => {
                                    dispatch(newAttachmentModal());
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} className="me-2" />
                                Add Attachment File
                            </button>
                            <ProjectNewImage
                                form={state.newImage}
                                onInputChange={onInputChange}
                                saveImage={() => {
                                    dispatch(saveProjectAttachment({ id: details.id, data: state.newImage.fields }));
                                }}
                                closeModal={() => {
                                    dispatch(closeOpenModal());
                                }}
                            />
                        </div>
                    </div>
                    <div className="card-body" id="aniimated-thumbnials">
                        {isLoading ? (
                            <BsSpinner />
                        ) : (
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 row-cols-xl-6 row-cols-xxl-6 g-3">
                                {details.attachments?.map((image, index) => (
                                    <div key={index} className="col">
                                        <div className="screen-card shadow-sm p-2 position-relative">
                                            <button
                                                onClick={() => {
                                                    dispatch(deleteProjectAttachment(image.id));
                                                }}
                                                className="btn btn-sm btn-danger rounded-circle position-absolute top-right-corner"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <a>
                                                <img className="img-fluid img-thumbnail" src={baseUrl() + '/images' + getImageName(image.filePath)} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
