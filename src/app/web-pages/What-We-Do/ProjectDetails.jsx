import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProjects } from './store/webProject.slice';
import { baseUrl } from '../../services/ApiService';
import { getImageName } from '../../utils/externals.util';
import moment from 'moment';
import HTMLReactParser from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ProjectDetails() {
    const { t } = useTranslation();

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
                                        {project.attachments && project.attachments.length > 0 ? (
                                            <div className="current-project-thumb mb-4" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                                                <Carousel
                                                    renderArrowPrev={(clickHandler, hasPrev) => (
                                                        hasPrev && (
                                                            <button
                                                                onClick={clickHandler}
                                                                className="carousel-arrow carousel-arrow-prev"
                                                                aria-label="Previous image"
                                                                style={{
                                                                    position: 'absolute',
                                                                    left: 15,
                                                                    top: '50%',
                                                                    transform: 'translateY(-50%)',
                                                                    zIndex: 1000,
                                                                    background: 'rgba(4, 128, 73, 0.8)',
                                                                    border: 'none',
                                                                    borderRadius: '50%',
                                                                    width: '45px',
                                                                    height: '45px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.3s ease',
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(4, 128, 73, 1)';
                                                                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(4, 128, 73, 0.8)';
                                                                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faChevronLeft} fontSize={18} color="#ffffff" />
                                                            </button>
                                                        )
                                                    )}
                                                    renderArrowNext={(clickHandler, hasNext) => (
                                                        hasNext && (
                                                            <button
                                                                onClick={clickHandler}
                                                                className="carousel-arrow carousel-arrow-next"
                                                                aria-label="Next image"
                                                                style={{
                                                                    position: 'absolute',
                                                                    right: 15,
                                                                    top: '50%',
                                                                    transform: 'translateY(-50%)',
                                                                    zIndex: 1000,
                                                                    background: 'rgba(4, 128, 73, 0.8)',
                                                                    border: 'none',
                                                                    borderRadius: '50%',
                                                                    width: '45px',
                                                                    height: '45px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.3s ease',
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(4, 128, 73, 1)';
                                                                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.background = 'rgba(4, 128, 73, 0.8)';
                                                                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faChevronRight} fontSize={18} color="#ffffff" />
                                                            </button>
                                                        )
                                                    )}
                                                    showArrows={project.attachments.length > 1}
                                                    showThumbs={project.attachments.length > 1}
                                                    showStatus={false}
                                                    infiniteLoop={project.attachments.length > 1}
                                                    autoPlay={false}
                                                    transitionTime={500}
                                                    swipeable={true}
                                                    emulateTouch={true}
                                                >
                                                    {project.attachments.map((attachment, index) => (
                                                        <div key={index} style={{ height: '500px', position: 'relative' }}>
                                                            <img
                                                                src={baseUrl() + '/images' + getImageName(attachment.filePath)}
                                                                alt={`${project.title} - Image ${index + 1}`}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </Carousel>
                                            </div>
                                        ) : (
                                            <div className="current-project-thumb mb-4" style={{ height: '400px', background: '#f5f5f5', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <FontAwesomeIcon icon={faFolderOpen} className="fa-3x text-muted" style={{ opacity: 0.3 }} />
                                            </div>
                                        )}

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
                            <div className="p-lg-5 pe-lg-0 pt-lg-0">
                                <div className="empty-state text-center py-5">
                                    <div className="empty-state-icon mb-4">
                                        <FontAwesomeIcon icon={faFolderOpen} className="fa-4x text-muted" style={{ opacity: 0.5 }} />
                                    </div>
                                    <div className="empty-state-content">
                                        <h3 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#333' }}>
                                            {t('projects_no_value')}
                                        </h3>
                                        <p className="text-muted mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                                            {t('projects_no_value_description')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-lg-4 pe-lg-5 py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="section-title text-start">
                            <strong>
                                <h5 className="mb-2" style={{ fontWeight: '400' }}>
                                    {t('project_others')}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
