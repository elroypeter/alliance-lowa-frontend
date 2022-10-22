import React, { Component } from 'react';
import ProjectContainer from './ProjectList/ProjectContainer';

export default class Project extends Component {
    render() {
        return (
            <div className="container-xxl">
                <ProjectContainer />
            </div>
        );
    }
}
