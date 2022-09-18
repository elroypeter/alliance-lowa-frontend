import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";
import {
    getProjectsApi,
    updateProjectApi,
    saveProjectApi,
    deleteProjectApi,
    publishProjectApi,
} from "../Project.service";

export default class ProjectContainer extends Component {
    state = {
        projects: [],
        openModal: false,
        editModal: false,
        form: {
            fields: {
                id: "",
                title: "",
                description: "",
            },
            errors: {},
        },
    };

    componentDidMount() {
        this.modalBtn = document.getElementById("newProjectModalBtn");
        setTimeout(() => this.getProjects());
    }

    getProjects = () => {
        getProjectsApi()
            .then((res) => {
                this.setState((state) => ({ ...state, projects: res.data }));
            })
            .catch(console.error());
    };

    saveProject = () => {
        saveProjectApi(this.state.form.fields)
            .then(() => {
                this.getProjects();
                this.closeModal();
                document.getElementById("closeProjectModal").click();
            })
            .catch(console.error);
    };

    updateProject = (id) => {
        updateProjectApi(id, this.state.form.fields)
            .then(() => {
                this.getProjects();
                this.closeModal();
                document.getElementById("closeProjectModal").click();
            })
            .catch(console.error);
    };

    deleteProject = (id) => {
        deleteProjectApi(id)
            .then(() => {
                this.getProjects();
            })
            .catch(console.error);
    };

    publishProject = (id, status) => {
        publishProjectApi(id, status)
            .then(() => {
                this.getProjects();
            })
            .catch(console.error);
    };

    newProjectModal = () => {
        const currentState = Object.assign({}, this.state);
        currentState.openModal = true;
        currentState.form = this.resetForm();
        this.setState(currentState);
    };

    onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, this.state.form.fields);
        const errors = Object.assign({}, this.state.form.errors);

        fields[name] = value;
        errors[name] = error;

        this.setState((state) => ({ ...state, form: { fields, errors } }));
    };

    resetForm = () => {
        return {
            fields: {
                id: "",
                title: "",
                description: "",
            },
            errors: {},
        };
    };

    editProject = (data) => {
        const currentState = Object.assign({}, this.state);
        currentState.openModal = true;
        currentState.editModal = true;
        currentState.form.fields = data;
        this.setState(currentState);
        this.modalBtn.click();
    };

    closeModal = () => {
        const currentState = Object.assign({}, this.state);
        currentState.openModal = false;
        currentState.editModal = false;
        currentState.form = this.resetForm();
        this.setState(currentState);
    };

    render() {
        return (
            <>
                <div className="row align-items-center">
                    <div className="border-0 mb-4">
                        <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                            <h3 className="h4 mb-0">Project List</h3>
                            <div className="col-auto d-flex w-sm-100 mt-2 mt-sm-0">
                                <button
                                    type="button"
                                    id="newProjectModalBtn"
                                    className="btn btn-primary btn-sm w-sm-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addProjectModal"
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="me-2"
                                    />
                                    Add Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ProjectList
                    deleteProject={this.deleteProject}
                    publishProject={this.publishProject}
                    editProject={this.editProject}
                    projects={this.state.projects}
                />
                <ProjectForm
                    editModal={this.state.editModal}
                    form={this.state.form}
                    onInputChange={this.onInputChange}
                    updateProject={this.updateProject}
                    saveProject={this.saveProject}
                    closeModal={this.closeModal}
                />
            </>
        );
    }
}
