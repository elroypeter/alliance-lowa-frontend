import React, { useEffect } from 'react';
import Account from './Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from './Breadcrumb';
import { AuthContext } from '../../../shared/AuthContext';

export default function Header(props) {
    useEffect(() => {
        window?.toggleNav();
    });

    return (
        <div className="header">
            <nav className="navbar py-4">
                <div className="container-xxl">
                    <AuthContext.Consumer>{(context) => <Account context={context} />}</AuthContext.Consumer>
                    <div className="navbar-toggler p-0 border-0 menu-toggle order-3" data-bs-toggle="collapse" data-bs-target="#mainHeader">
                        <FontAwesomeIcon icon={faBars} />
                        <FontAwesomeIcon icon={faX} />
                    </div>
                    <Breadcrumb locationChange={props.locationChange} menuList={props.menuList} />
                </div>
            </nav>
        </div>
    );
}
