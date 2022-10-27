import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrash, faBullhorn, faEye } from '@fortawesome/free-solid-svg-icons';
import { baseUrl } from '../../../services/ApiService';
import { getImageName } from '../../../utils/externals.util';
import { publicImageSlide } from '../store/ImageSlider.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ImageSlider(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteImage = (id) => {
        props.deleteImage(id);
    };

    const publishImage = (id, status) => {
        dispatch(publicImageSlide({ id, status }));
    };

    return (
        <div className="col-md-4 col-xxl-3 mb-2">
            <div className="screen-card shadow-sm p-2">
                <a
                    onClick={() => {
                        navigate(`/admin/image-slides/${props.image.id}`);
                    }}
                    className="position-relative"
                >
                    <span className="position-absolute badge rounded-pill bg-warning" style={{ right: '0px' }}>
                        {props.image.translations.map((trans, index) => {
                            return `${trans.langCode} ${index + 1 !== props.image.translations.length ? ' | ' : ''}`;
                        })}
                    </span>
                    <img
                        className="img-fluid img-thumbnail w-100"
                        src={baseUrl() + '/images' + getImageName(props.image.filePath)}
                        style={{ height: '200px' }}
                    />
                </a>
                <div className="card-footer">
                    <div className="d-flex align-items-center">
                        <span className={'badge rounded-pill ' + (props.image.isPublished.status ? 'bg-success' : 'bg-danger')}>
                            {props.image.isPublished.status ? 'Published' : 'Not published'}
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
                                        <a
                                            onClick={() => {
                                                navigate(`/admin/image-slides/${props.image.id}`);
                                            }}
                                            className="list-group-item list-group-item-action border-0 "
                                        >
                                            <FontAwesomeIcon icon={faEye} className="me-3" />
                                            View
                                        </a>
                                        <a
                                            onClick={() => publishImage(props.image.id, !props.image.isPublished.status)}
                                            className="list-group-item list-group-item-action border-0 "
                                        >
                                            <FontAwesomeIcon icon={faBullhorn} className="me-3" />
                                            {props.image.isPublished.status ? 'Unpublish' : 'Publish'}
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
