import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../store/Message.slice';

export default function MessageItem(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gotoPage = (path) => {
        navigate(path);
    };

    return (
        <tr>
            <td>{parseInt(props.index) + 1}</td>
            <td>{props.message.name}</td>
            <td>{props.message.email}</td>
            <td>{props.message.mobile}</td>
            <td className="text-center">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button onClick={() => gotoPage(`/admin/messages/${props.message.id}`)} type="button" className="btn btn-outline-light">
                        <FontAwesomeIcon icon={faEye} className="text-primary" />
                    </button>
                    <button onClick={() => dispatch(deleteMessage(props.message.id))} type="button" className="btn btn-outline-light">
                        <FontAwesomeIcon icon={faTrash} className="text-danger" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
