import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SideULink(props) {
    return (
        <ul className="menu-list flex-grow-1 mt-5">
            {props.menuList.map((page, index) => (
                <li key={index}>
                    <NavLink to={page.link} className="m-link">
                        <FontAwesomeIcon icon={page.icon} className="icofont-home fs-5"></FontAwesomeIcon>
                        <span>{page.name}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}
