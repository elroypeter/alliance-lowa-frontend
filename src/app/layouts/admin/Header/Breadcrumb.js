import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Breadcrumb(props) {
    const [currentPage, setState] = useState(props.menuList[0]);

    props.locationChange((path) => {
        const page = props.menuList.find((menu) => path.includes(menu.link));
        if (page) setState(page);
    });

    return (
        <div className="order-0 col mb-3 mb-md-0 d-flex align-items-center">
            <Link to={currentPage.link} className="menu-toggle-option me-3 text-primary d-flex align-items-center">
                <FontAwesomeIcon icon={currentPage.icon} />
            </Link>
            <div className="border-start px-3 flex-fill">
                <span>{currentPage.name}</span>
            </div>
        </div>
    );
}
