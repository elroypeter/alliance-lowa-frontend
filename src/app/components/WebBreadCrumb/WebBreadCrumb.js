import React from 'react';

export default function WebBreadCrumb(props) {
    return (
        <div className="container-fluid page-header py-5 mb-5">
            <div className="container py-5">
                <h1 className="display-3 text-white mb-3 animated slideInDown">{props.page}</h1>
                <nav aria-label="breadcrumb animated slideInDown">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a className="text-white">Home</a>
                        </li>
                        <li className="breadcrumb-item text-white active" aria-current="page">
                            {props.page}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    );
}
