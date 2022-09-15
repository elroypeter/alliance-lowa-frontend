/* eslint-disable indent */
import React, { Component } from "react";
import ImageInput from "./ImageInput";

export default class Field extends Component {
    const;

    state = {
        value: this.props.value,
        errors: false,
    };

    onChange = (event) => {
        const name = this.props.name;
        const value = event.target.value;
        const errors = this.props.validate ? this.props.validate(value) : false;

        this.setState({ value, errors });
        this.props.onInputChange({ name, value, errors });
    };

    static getDerivedStateFromProps = (nextProps) => {
        return { value: nextProps.value };
    };

    input = () => {
        return (
            <>
                <label className="form-label fs-6">{this.props.label}</label>
                <input
                    type={this.props.type}
                    name={this.props.name}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    className="form-control"
                    onChange={this.onChange}
                />
                <small className="text-danger">{this.state.errors}</small>
            </>
        );
    };

    textArea = () => {
        return (
            <>
                <label className="form-label fs-6">{this.props.label}</label>
                <textarea
                    name={this.props.name}
                    value={this.state.value}
                    className="form-control"
                    onChange={this.onChange}
                ></textarea>
                <small className="text-danger">{this.state.errors}</small>
            </>
        );
    };

    image = (props) => {
        const checkForFileType = (type) => {
            return ["jpg", "png", "webp", "jpeg"].find((val) => val === type)
                ? true
                : false;
        };

        const onSelectFile = (evt, croppie) => {
            const name = this.props.name;
            let value = evt.target.files[0];
            let errors = false;
            const originalType = value.type.split("/")[1];

            if (!checkForFileType(originalType)) {
                errors = "Invalid file format";
                this.setState((state) => ({
                    ...state,
                    errors,
                }));
            }

            const preview = URL.createObjectURL(value);
            croppie.bind({ url: preview });

            croppie.result("base64").then((base64) => {
                value = base64;
                this.setState((state) => ({
                    ...state,
                    value,
                }));
                this.props.onInputChange({ name, value, errors });
            });
        };

        return (
            <>
                <ImageInput
                    id={new Date().getTime()}
                    label={this.props.label}
                    config={props}
                    value={this.state.value}
                    onChange={onSelectFile}
                />
                <small className="text-danger">{this.state.errors}</small>
            </>
        );
    };

    render() {
        switch (this.props.formType) {
            case "input":
                return this.input();
            case "image":
                return this.image(this.props.config);
            case "textArea":
                return this.textArea();
            default:
                return this.input();
        }
    }
}
