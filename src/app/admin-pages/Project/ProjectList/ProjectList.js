import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ProjectForm from './ProjectForm';
import { loadProjects, closeOpenModal, newProject, saveProject } from '../store/Project.slice';
import { useDispatch, useSelector } from 'react-redux';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import ProjectItem from './ProjectItem';

export default function ProjectList() {
    const dispatch = useDispatch();
    const { projects, isLoading, isModalOpen } = useSelector((state) => state.project);
    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                title: '',
                langCode: '',
                description: '',
            },
            errors: {},
        },
    });

    useEffect(() => {
        dispatch(loadProjects());
    }, []);

    useEffect(() => {
        if (!isModalOpen) closeModal();
    }, [isModalOpen]);

    useEffect(() => {
        if (projects.length > 0) {
            window?.loadDataTable('projectsTable');
        }
    }, [projects]);

    useEffect(() => {
        window?.destroyDataTable('projectsTable');
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
        document.getElementById('closeProjectModal').click();
        setState(currentState);
    };

    return (
        <>
            <div className="row mb-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center bg-transparent py-3">
                            <h6 className="m-0 fw-bold">Project List</h6>
                            <div className="ms-auto report ms-3 w-80">
                                <button
                                    onClick={() => dispatch(newProject())}
                                    type="button"
                                    id="newProjectModalBtn"
                                    className="btn btn-primary btn-sm w-sm-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addProjectModal"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                                    Add Project
                                </button>
                                <ProjectForm
                                    form={state.form}
                                    onInputChange={onInputChange}
                                    updateProject={() => {}}
                                    saveProject={() => {
                                        dispatch(saveProject(state.form.fields));
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
                                <table id="projectsTable" className="table table-hover" style={{ width: '100%' }}>
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
                                        {projects.map((project, index) => (
                                            <ProjectItem
                                                key={index}
                                                index={index}
                                                project={project}
                                                editProject={() => {}}
                                                deleteProject={() => {}}
                                            />
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
