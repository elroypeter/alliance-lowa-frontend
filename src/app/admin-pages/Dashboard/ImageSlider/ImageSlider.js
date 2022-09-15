import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faEllipsis,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function ImageSlider() {
    return (
        <div className="col-lg-4 mb-2">
            <div className="screen-card shadow-sm p-2">
                <a>
                    <img
                        className="img-fluid img-thumbnail"
                        src="/assets/images/slider/slider1.png"
                    />
                </a>
                <div className="user-profile d-flex align-items-center mt-3">
                    <h6>Image Title</h6>
                </div>
                <div className="card-footer">
                    <div className="d-flex align-items-center">
                        <span className="badge rounded-pill bg-success">
                            <FontAwesomeIcon icon={faCheck} />
                            Published
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
                                        <a className="list-group-item list-group-item-action border-0 ">
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="me-3"
                                            />
                                            Edit
                                        </a>
                                        <a className="list-group-item list-group-item-action border-0 ">
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="me-3"
                                            />
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
