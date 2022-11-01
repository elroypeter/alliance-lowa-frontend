import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { publishCareer, deleteCareer } from '../store/Career.slice';

export default function CareerItem(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gotoPage = (path) => {
        navigate(path);
    };

    return (
        <tr>
            <td>{parseInt(props.index) + 1}</td>
            <td>{props.career.title}</td>
            <td>
                <span className={'badge ' + (props.career.isPublished.status ? 'bg-success' : 'bg-danger')}>
                    {props.career.isPublished.status ? 'Published' : 'Not Published'}
                </span>
            </td>
            <td className="text-center">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button
                        onClick={() => gotoPage(`/admin/careers/${props.career.id}/${props.career.slug}`)}
                        type="button"
                        className="btn btn-outline-light"
                    >
                        <FontAwesomeIcon icon={faEye} className="text-primary" />
                    </button>
                    <button
                        onClick={() => {
                            dispatch(
                                publishCareer({
                                    id: props.career.id,
                                    status: !props.career.isPublished.status,
                                }),
                            );
                        }}
                        type="button"
                        className="btn btn-outline-light"
                    >
                        <FontAwesomeIcon icon={faBullhorn} className="text-dark" />
                    </button>
                    <button onClick={() => dispatch(deleteCareer(props.career.id))} type="button" className="btn btn-outline-light">
                        <FontAwesomeIcon icon={faTrash} className="text-danger" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
