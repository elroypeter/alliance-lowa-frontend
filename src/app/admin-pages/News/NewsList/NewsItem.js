import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { publicNews, deleteNews } from '../store/News.slice';

export default function ProjectItem(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gotoPage = (path) => {
        navigate(path);
    };

    return (
        <tr>
            <td>{parseInt(props.index) + 1}</td>
            <td>{props.news.translations[0].title}</td>
            <td>
                <span className="badge rounded-pill bg-warning" style={{ right: '0px' }}>
                    {props.news.translations.map((trans, index) => {
                        return `${trans.langCode} ${index + 1 !== props.news.translations.length ? ' | ' : ''}`;
                    })}
                </span>
            </td>
            <td>
                <span className={'badge ' + (props.news.isPublished.status ? 'bg-success' : 'bg-danger')}>
                    {props.news.isPublished.status ? 'Published' : 'Not Published'}
                </span>
            </td>
            <td className="text-center">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button
                        onClick={() => gotoPage(`/admin/news/${props.news.id}/${props.news.translations[0].slug}`)}
                        type="button"
                        className="btn btn-outline-light"
                    >
                        <FontAwesomeIcon icon={faEye} className="text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            dispatch(
                                publicNews({
                                    id: props.news.id,
                                    status: !props.news.isPublished.status,
                                }),
                            );
                        }}
                        type="button"
                        className="btn btn-outline-light"
                    >
                        <FontAwesomeIcon icon={faBullhorn} className="text-dark" />
                    </button>
                    <button onClick={() => dispatch(deleteNews(props.news.id))} type="button" className="btn btn-outline-light">
                        <FontAwesomeIcon icon={faTrash} className="text-danger" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
