import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadProjectDetails } from '../store/ProjectDetails.slice';
import ProjectAttachment from './ProjectAttachment';
import ProjectTranslation from './ProjectTranslation';

export default function ProjectDetails() {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProjectDetails({ id: params.id }));
    }, []);

    return (
        <div className="container-xxl">
            <ProjectTranslation />
            <ProjectAttachment />
        </div>
    );
}
