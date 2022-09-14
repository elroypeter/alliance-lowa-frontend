/* eslint-disable indent */
import React, { Component } from "react";

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

    render() {
        switch (this.props.formType) {
            case "input":
                return this.input();
            default:
                return this.input();
        }
    }
}
