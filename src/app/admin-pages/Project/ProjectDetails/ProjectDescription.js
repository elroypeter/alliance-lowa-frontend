import React from 'react';
import HTMLReactParser from 'html-react-parser';

export default function ProjectDescription(props) {
    return (
        <div className="row g-3 mb-3">
            <div className="col-12">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 py-3">
                        <h6 className="m-0 fw-bold">Description</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">{HTMLReactParser(props.projectDescription || '')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
