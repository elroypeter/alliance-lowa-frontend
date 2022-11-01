import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { publicProject, deleteProject } from '../store/Project.slice';

export default function ProjectItem(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gotoPage = (path) => {
        navigate(path);
    };

    return (
        <tr>
            <td>{parseInt(props.index) + 1}</td>
            <td>{props.project.translations[0].title}</td>
            <td>
                <span className="badge rounded-pill bg-warning" style={{ right: '0px' }}>
                    {props.project.translations.map((trans, index) => {
                        return `${trans.langCode} ${index + 1 !== props.project.translations.length ? ' | ' : ''}`;
                    })}
                </span>
            </td>
            <td>
                <span className={'badge ' + (props.project.isPublished.status ? 'bg-success' : 'bg-danger')}>
                    {props.project.isPublished.status ? 'Published' : 'Not Published'}
                </span>
            </td>
            <td className="text-center">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button
                        onClick={() => gotoPage(`/admin/projects/${props.project.id}/${props.project.translations[0].slug}`)}
                        type="button"
                        className="btn btn-outline-light"
                    >
                        <FontAwesomeIcon icon={faEye} className="text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            dispatch(
                                publicProject({
                                    id: props.project.id,
                                    status: !props.project.isPublished.status,
                                }),
                            );
                        }}
                        type="button"
                        className="btn btn-outline-light"
                    >
                        <FontAwesomeIcon icon={faBullhorn} className="text-dark" />
                    </button>
                    <button onClick={() => dispatch(deleteProject(props.project.id))} type="button" className="btn btn-outline-light">
                        <FontAwesomeIcon icon={faTrash} className="text-danger" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
