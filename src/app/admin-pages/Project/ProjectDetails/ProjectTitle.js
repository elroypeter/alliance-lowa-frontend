import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function ProjectTitle(props) {
    return (
        <div className="row align-items-center">
            <div className="border-0 mb-4">
                <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                    <h3 className="h4 mb-0">{props.title}</h3>
                    <div className="col-auto d-flex w-sm-100 mt-2 mt-sm-0">
                        <button type="button" id="newProjectModalBtn" data-bs-toggle="modal" data-bs-target="#addProjectModal" hidden={true}></button>
                        <button
                            type="button"
                            id="newProjectImageModalBtn"
                            data-bs-toggle="modal"
                            data-bs-target="#newProjectImageModal"
                            className="btn btn-sm w-sm-100 btn-primary"
                            hidden={true}
                        ></button>

                        <button type="button" className="btn btn-primary btn-sm w-sm-100 me-2" onClick={props.editProject}>
                            <FontAwesomeIcon icon={faEdit} className="me-2" />
                            Edit
                        </button>
                        <button type="button" className="btn btn-sm w-sm-100 btn-primary" onClick={props.openAddImage}>
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
