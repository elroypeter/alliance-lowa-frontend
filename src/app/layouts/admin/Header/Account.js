import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Account(props) {
    const signOut = (evt) => {
        evt.preventDefault();
        sessionStorage.clear();
        props.context.setLoginStatus();
    };

    return (
        <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">
            <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center">
                <a
                    className="nav-link dropdown-toggle pulse p-0"
                    role="button"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                >
                    <img className="avatar lg rounded-circle img-thumbnail" src="/assets/images/defaults/profile.svg" />
                </a>
                <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                    <div className="card border-0 w280">
                        <div className="list-group m-2">
                            <a className="list-group-item list-group-item-action border-0 ">
                                <FontAwesomeIcon icon={faShieldAlt} className="me-3" />
                                Change password
                            </a>
                            <a onClick={signOut} className="list-group-item list-group-item-action border-0 ">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-3" />
                                Signout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
