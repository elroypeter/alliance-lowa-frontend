import React from 'react';
import ProjectForm from '../ProjectList/ProjectForm';
import ProjectTitle from './ProjectTitle';
import ProjectImages from './ProjectImages';
import ProjectDescription from './ProjectDescription';
import ProjectNewImage from './ProjectNewImage';

import { useParams } from 'react-router-dom';
import { getProjectDetailsApi, updateProjectApi, addProjectImageApi, removeProjectImageApi } from '../Project.service';

function withParams(Component) {
    // eslint-disable-next-line react/display-name
    return (props) => <Component {...props} params={useParams()} />;
}

class ProjectDetails extends React.Component {
    state = {
        details: {},
        openModal: false,
        editModal: false,
        form: {
            fields: {
                id: '',
                title: '',
                description: '',
            },
            errors: {},
        },
        newImage: {
            fields: {
                image: '',
            },
            errors: {},
        },
    };

    componentDidMount() {
        this.modalBtn = document.getElementById('newProjectModalBtn');
        this.imageModalBtn = document.getElementById('newProjectImageModalBtn');
        this.getDetails(parseInt(this.props.params.id));
    }

    getDetails = (id) => {
        getProjectDetailsApi(id)
            .then((res) => {
                this.setState((state) => ({ ...state, details: res.data }));
            })
            .catch(console.error);
    };

    onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, this.state.form.fields);
        const errors = Object.assign({}, this.state.form.errors);

        fields[name] = value;
        errors[name] = error;

        this.setState((state) => ({ ...state, form: { fields, errors } }));
    };

    onInputChangeImage = ({ name, value, error }) => {
        const fields = Object.assign({}, this.state.newImage.fields);
        const errors = Object.assign({}, this.state.newImage.errors);

        fields[name] = value;
        errors[name] = error;

        this.setState((state) => ({ ...state, newImage: { fields, errors } }));
    };

    resetForm = (form) => {
        if (form) {
            return {
                fields: {
                    id: '',
                    title: '',
                    description: '',
                },
                errors: {},
            };
        } else {
            return {
                fields: {
                    image: '',
                },
                errors: {},
            };
        }
    };

    editProject = () => {
        const { id, title, description } = this.state.details;
        const currentState = Object.assign({}, this.state);

        currentState.openModal = true;
        currentState.editModal = true;
        currentState.form.fields = { title, id, description };
        this.setState(currentState);
        this.modalBtn.click();
    };

    openAddImage = () => {
        this.imageModalBtn.click();
    };

    updateProject = (id) => {
        updateProjectApi(id, this.state.form.fields)
            .then(() => {
                this.getDetails(parseInt(this.props.params.id));
                this.closeModal();
                document.getElementById('closeProjectModal').click();
            })
            .catch(console.error);
    };

    addProjectImage = () => {
        addProjectImageApi(this.state.details.id, this.state.newImage.fields)
            .then(() => {
                this.getDetails(parseInt(this.props.params.id));
                this.closeModal();
                document.getElementById('closeImageModal').click();
            })
            .catch(console.error);
    };

    deleteImage = (id) => {
        removeProjectImageApi(id)
            .then(() => {
                this.getDetails(parseInt(this.props.params.id));
            })
            .catch(console.error);
    };

    closeModal = () => {
        const currentState = Object.assign({}, this.state);
        currentState.openModal = false;
        currentState.editModal = false;
        currentState.form = this.resetForm(true);
        currentState.newImage = this.resetForm(false);
        this.setState(currentState);
    };

    render() {
        return (
            <div className="container-xxl">
                <ProjectTitle title={this.state.details.title} editProject={this.editProject} openAddImage={this.openAddImage} />
                <ProjectImages images={this.state.details.images} deleteImage={this.deleteImage} />
                <ProjectDescription projectDescription={this.state.details.description} />
                <ProjectForm
                    editModal={this.state.editModal}
                    form={this.state.form}
                    onInputChange={this.onInputChange}
                    updateProject={this.updateProject}
                    closeModal={this.closeModal}
                />
                <ProjectNewImage
                    form={this.state.newImage}
                    onInputChange={this.onInputChangeImage}
                    saveImage={this.addProjectImage}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

export default withParams(ProjectDetails);
