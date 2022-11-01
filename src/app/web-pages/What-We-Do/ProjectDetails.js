import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProjects } from './store/webProject.slice';
import { baseUrl } from '../../services/ApiService';
import { getImageName } from '../../utils/externals.util';
import moment from 'moment';
import HTMLReactParser from 'html-react-parser';

export default function ProjectDetails() {
    let current = [];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const activeProject = useParams().id;
    const { projects } = useSelector((store) => store.webProject);
    const { selectedLanguage } = useSelector((store) => store.language);

    useEffect(() => {
        dispatch(loadProjects({ langCode: selectedLanguage, isPublished: true }));
    }, [selectedLanguage]);

    const gotoPage = (path) => {
        navigate(path);
    };

    if (!activeProject) {
        current = projects[0] ? current.concat(projects[0]) : [];
    } else {
        const selected = projects.filter((projects) => projects.id == activeProject);
        current = selected ? current.concat(selected) : [];
    }

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div className="col-lg-8 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        {current.length > 0 ? (
                            current.map((project) => (
                                <div key={project.id}>
                                    <article className="p-lg-5 pe-lg-0 pt-lg-0">
                                        <div className="current-project-thumb mb-4">
                                            <img
                                                src={
                                                    project.attachments.length
                                                        ? baseUrl() + '/images' + getImageName(project.attachments[0].filePath)
                                                        : '/assets/images/defaults/placeholder.png'
                                                }
                                            />
                                        </div>

                                        <div className="section-title text-start">
                                            <strong>
                                                <h1 className="display-5 mb-4" style={{ fontWeight: '400', fontSize: '2rem' }}>
                                                    {project.title}
                                                </h1>
                                            </strong>
                                        </div>
                                        <div>{HTMLReactParser(project.description || '')}</div>
                                    </article>
                                </div>
                            ))
                        ) : (
                            <p className="p-lg-5 pe-lg-0 pt-lg-0">
                                There are no projects posted yet or Selected Project has not translation in the current language
                            </p>
                        )}
                    </div>
                    <div className="col-lg-4 pe-lg-5 py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="section-title text-start">
                            <strong>
                                <h5 className="mb-2" style={{ fontWeight: '400' }}>
                                    Other Projects
                                </h5>
                            </strong>
                        </div>
                        {projects.map((project) => (
                            <div key={project.id} className="other-projects-list">
                                <div className="project-item d-flex">
                                    <a className="project-thumb" onClick={() => gotoPage(`/what-we-do/${project.id}/${project.slug}`)}>
                                        <img
                                            src={
                                                project.attachments.length
                                                    ? baseUrl() + '/images' + getImageName(project.attachments[0].filePath)
                                                    : '/assets/images/defaults/placeholder.png'
                                            }
                                        />
                                    </a>
                                    <div className="project-header d-flex flex-column">
                                        <h2>
                                            <a className="nav-link" onClick={() => gotoPage(`/what-we-do/${project.id}/${project.slug}`)}>
                                                {project.title}
                                            </a>
                                        </h2>
                                        <div className="project-time">
                                            <span>
                                                <time className="published" dateTime="2021-07-31T12:21:00.000-07:00">
                                                    {moment(project.createdAt).format('MMM Do, YYYY')}
                                                </time>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="section-title text-start">
                            <strong>
                                <h5 className="mb-2" style={{ fontWeight: '400' }}>
                                    News & Events
                                </h5>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
