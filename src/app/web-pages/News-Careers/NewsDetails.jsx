import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HTMLReactParser from 'html-react-parser';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import { loadNews, loadCareers } from './store/newsCareers.slice';

export default function NewsDetails() {
    const { t } = useTranslation();

    let currentNews = [];
    let currentCareers = [];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const activeItemId = useParams().id;
    const activeCategory = searchParams.get('category');

    const { careers, blogNews } = useSelector((store) => store.webCareers);
    const { selectedLanguage } = useSelector((store) => store.language);

    useEffect(() => {
        dispatch(loadNews({ langCode: selectedLanguage, isPublished: true }));
        dispatch(loadCareers({ langCode: selectedLanguage, isPublished: true }));
    }, [selectedLanguage]);

    const gotoPage = (path) => {
        navigate(path);
    };

    const updateSearchParam = (category) => {
        setSearchParams((params) => {
            params.set('category', category);
            return params;
        });
    };

    if (activeCategory === undefined || activeCategory === 'news') {
        if (!activeItemId) {
            currentNews = blogNews[0] ? currentNews.concat(blogNews[0]) : [];
        } else {
            const selected = blogNews.filter((projects) => projects.id == activeItemId);
            currentNews = selected ? currentNews.concat(selected) : [];
        }
    } else {
        if (!activeItemId) {
            currentCareers = careers[0] ? currentCareers.concat(careers[0]) : [];
        } else {
            const selected = careers.filter((projects) => projects.id == activeItemId);
            currentCareers = selected ? currentCareers.concat(selected) : [];
        }
    }

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div className="col-lg-12 about-text py-4 wow fadeIn">
                        <nav className="px-3 px-lg-4">
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button
                                    className="nav-link active"
                                    id="nav-home-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-home"
                                    aria-selected="true"
                                    onClick={() => updateSearchParam('news')}
                                >
                                    News
                                </button>
                                <button
                                    className="nav-link"
                                    id="nav-profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-profile"
                                    aria-selected="false"
                                    onClick={() => updateSearchParam('careers')}
                                >
                                    Careers
                                </button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="row g-0 mx-lg-0">
                                    <div className="col-lg-8 about-text py-4 wow fadeIn" data-wow-delay="0.5s">
                                        {currentNews.length > 0 ? (
                                            currentNews.map((project) => (
                                                <div key={project.id}>
                                                    <article className="p-lg-4 pe-lg-0 pt-lg-0">
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
                                            <div className="p-lg-4 pe-lg-0 pt-lg-0">
                                                <div className="empty-state text-center py-5">
                                                    <div className="empty-state-icon mb-4">
                                                        <FontAwesomeIcon icon={faFolderOpen} className="fa-4x text-muted" style={{ opacity: 0.5 }} />
                                                    </div>
                                                    <div className="empty-state-content">
                                                        <h3 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#333' }}>
                                                            {t('projects_no_value')}
                                                        </h3>
                                                        <p className="text-muted mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                                                            {t('projects_no_value_description_news')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-lg-4 pe-lg-4 py-4 wow fadeIn" data-wow-delay="0.5s">
                                        <div className="section-title text-start">
                                            <strong>
                                                <h5 className="mb-2" style={{ fontWeight: '400' }}>
                                                    {t('project_news_blogs')}
                                                </h5>
                                            </strong>
                                        </div>
                                        {blogNews.map((project) => (
                                            <div key={project.id} className="other-projects-list">
                                                <div className="project-item d-flex">
                                                    <div className="project-header d-flex flex-column">
                                                        <h2>
                                                            <a
                                                                className="nav-link"
                                                                onClick={() =>
                                                                    gotoPage(`/new-and-careers/${project.id}/${project.slug}?category=news`)
                                                                }
                                                            >
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

                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <div className="row g-0 mx-lg-0">
                                    <div className="col-lg-8 about-text py-4 wow fadeIn" data-wow-delay="0.5s">
                                        {currentCareers.length > 0 ? (
                                            currentCareers.map((project) => (
                                                <div key={project.id}>
                                                    <article className="p-lg-4 pe-lg-0 pt-lg-0">
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
                                            <div className="p-lg-4 pe-lg-0 pt-lg-0">
                                                <div className="empty-state text-center py-5">
                                                    <div className="empty-state-icon mb-4">
                                                        <FontAwesomeIcon icon={faFolderOpen} className="fa-4x text-muted" style={{ opacity: 0.5 }} />
                                                    </div>
                                                    <div className="empty-state-content">
                                                        <h3 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#333' }}>
                                                            {t('projects_no_value')}
                                                        </h3>
                                                        <p className="text-muted mb-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                                                            {t('projects_no_value_description_careers')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-lg-4 pe-lg-4 py-4 wow fadeIn" data-wow-delay="0.5s">
                                        <div className="section-title text-start">
                                            <strong>
                                                <h5 className="mb-2" style={{ fontWeight: '400' }}>
                                                    {t('project_careers')}
                                                </h5>
                                            </strong>
                                        </div>
                                        {careers.map((project) => (
                                            <div key={project.id} className="other-projects-list">
                                                <div className="project-item d-flex">
                                                    <div className="project-header d-flex flex-column">
                                                        <h2>
                                                            <a
                                                                className="nav-link"
                                                                onClick={() =>
                                                                    gotoPage(`/new-and-careers/${project.id}/${project.slug}?category=careers`)
                                                                }
                                                            >
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
                    </div>
                </div>
            </div>
        </div>
    );
}
