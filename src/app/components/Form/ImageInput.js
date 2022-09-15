import React, { Component } from "react";
import * as Croppie from "croppie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default class ImageInput extends Component {
    state = {
        config: {
            viewport: { width: 100, height: 100 },
            boundary: { height: 300 },
            showZoomer: true,
            enableResize: true,
            enableOrientation: true,
            ...this.props.config,
        },
    };

    componentDidMount() {
        this.croppieTarget = document.getElementById(this.props.id);
        this.croppieInstance = new Croppie(
            this.croppieTarget,
            this.state.config
        );
    }

    render() {
        return (
            <>
                <label className="form-label d-flex align-items-center justify-content-between fs-6">
                    <span>{this.props.label}</span>
                    <div>
                        <span className="badge bg-primary">
                            <FontAwesomeIcon icon={faUpload} className="me-2" />
                            select file
                        </span>
                        <input
                            onChange={(evt) => {
                                this.props.onChange(
                                    evt,
                                    this.croppieInstance,
                                    this.croppieTarget
                                );
                            }}
                            type="file"
                            name="myfile"
                            hidden={true}
                        />
                    </div>
                </label>
                <div id={this.props.id}></div>
            </>
        );
    }
}
