import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ProjectImages(props) {
    return (
        <div className="row g-3 mb-3">
            <div className="col-12">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 py-3">
                        <h6 className="m-0 fw-bold">Images</h6>
                    </div>
                    <div className="card-body" id="aniimated-thumbnials">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 row-cols-xl-6 row-cols-xxl-6 g-3">
                            {props.images?.map((image, index) => (
                                <div key={index} className="col">
                                    <div className="screen-card shadow-sm p-2 position-relative">
                                        <button
                                            onClick={() => props.deleteImage(image.id)}
                                            className="btn btn-sm btn-danger rounded-circle position-absolute top-right-corner"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <a>
                                            <img className="img-fluid img-thumbnail" src={image.imageData} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
