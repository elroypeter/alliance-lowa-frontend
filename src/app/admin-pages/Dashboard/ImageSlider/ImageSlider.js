import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faEdit, faTrash, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { baseUrl } from '../../../services/ApiService';

export default function ImageSlider(props) {
    const deleteImage = (id) => {
        props.deleteImage(id);
    };

    const publishImage = (id, status) => {
        props.publishImage(id, status);
    };

    const editImage = (data) => {
        props.editSlider(data);
    };

    return (
        <div className="col-md-4 col-xxl-3 mb-2">
            <div className="screen-card shadow-sm p-2">
                <a>
                    <img className="img-fluid img-thumbnail w-100" src={baseUrl() + '/images/' + props.image.image} style={{ height: '200px' }} />
                </a>
                <div className="user-profile d-flex align-items-center mt-3">
                    <h6>{props.image.title}</h6>
                </div>
                <div className="card-footer">
                    <div className="d-flex align-items-center">
                        <span className={'badge rounded-pill ' + (props.image.isPublished ? 'bg-success' : 'bg-danger')}>
                            {props.image.isPublished ? 'Published' : 'Not published'}
                        </span>
                        <div className="ms-auto position-relative">
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
                                        <a onClick={() => editImage(props.image)} className="list-group-item list-group-item-action border-0 ">
                                            <FontAwesomeIcon icon={faEdit} className="me-3" />
                                            Edit
                                        </a>

                                        <a
                                            onClick={() => publishImage(props.image.id, !props.image.isPublished)}
                                            className="list-group-item list-group-item-action border-0 "
                                        >
                                            <FontAwesomeIcon icon={faBullhorn} className="me-3" />
                                            {props.image.isPublished ? 'Unpublish' : 'Publish'}
                                        </a>

                                        <a className="list-group-item list-group-item-action border-0 " onClick={() => deleteImage(props.image.id)}>
                                            <FontAwesomeIcon icon={faTrash} className="me-3" />
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
