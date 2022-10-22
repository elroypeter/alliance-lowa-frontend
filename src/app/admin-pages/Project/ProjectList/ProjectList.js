import React, { useEffect } from 'react';
import ProjectItem from './ProjectItem';

export default function ProjectList(props) {
    useEffect(() => {
        if (props.projects.length > 0) {
            window?.loadDataTable('projectsTable');
        }
    });

    return (
        <div className="row clearfix g-3">
            <div className="col-sm-12">
                <div className="card mb-3">
                    <div className="card-body">
                        <table id="projectsTable" className="table table-hover" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.projects.map((project, index) => (
                                    <ProjectItem
                                        key={index}
                                        index={index}
                                        project={project}
                                        editProject={props.editProject}
                                        deleteProject={props.deleteProject}
                                        publishProject={props.publishProject}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
