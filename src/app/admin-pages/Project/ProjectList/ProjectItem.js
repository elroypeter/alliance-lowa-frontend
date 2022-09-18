import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    faEye,
    faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

export default function ProjectItem(props) {
    return (
        <tr>
            <td>{parseInt(props.index) + 1}</td>
            <td>{props.project.title}</td>
            <td>
                <span
                    className={
                        "badge " +
                        (props.project.isPublished ? "bg-success" : "bg-danger")
                    }
                >
                    {props.project.isPublished ? "Published" : "Not Published"}
                </span>
            </td>
            <td className="text-center">
                <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic outlined example"
                >
                    <button type="button" className="btn btn-outline-light">
                        <FontAwesomeIcon
                            icon={faEye}
                            className="text-primary"
                        />
                    </button>
                    <button
                        onClick={() =>
                            props.publishProject(
                                props.project.id,
                                !props.project.isPublished
                            )
                        }
                        type="button"
                        className="btn btn-outline-light"
                    >
                        <FontAwesomeIcon
                            icon={faBullhorn}
                            className="text-dark"
                        />
                    </button>
                    <button
                        onClick={() => props.editProject(props.project)}
                        type="button"
                        className="btn btn-outline-light"
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="text-secondary"
                        />
                    </button>
                    <button
                        onClick={() => props.deleteProject(props.project.id)}
                        type="button"
                        className="btn btn-outline-light"
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger"
                        />
                    </button>
                </div>
            </td>
        </tr>
    );
}
