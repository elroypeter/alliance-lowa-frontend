import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';

export default function Logo() {
    return (
        <a className="mb-0 brand-icon">
            <span className="logo-icon">
                <FontAwesomeIcon icon={faCodepen} className="icofont-stopwatch fs-2" />
            </span>
            <span className="logo-text">Admin Panel</span>
        </a>
    );
}
