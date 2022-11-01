import React from 'react';
import { ApiService } from '../../services/ApiService';
import BsSpinner from '../Spinner/BsSpinner';

export class ContactForm extends React.Component {
    state = {
        fields: {
            name: '',
            email: '',
            mobile: '',
            message: '',
        },
        errors: {},
        saving: false,
    };

    validate = () => {
        const formFields = this.state.fields;
        const fieldErrors = this.state.errors;
        const errorMessages = Object.keys(fieldErrors).filter((e) => fieldErrors[e]);

        if (!formFields.email) return true;
        if (!formFields.name) return true;
        if (!formFields.message) return true;
        if (errorMessages.length) return true;
        return false;
    };

    validateField = (val, name) => (val ? false : `${name} is required`);

    onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, this.state.fields);
        const errors = Object.assign({}, this.state.errors);

        fields[name] = value;
        errors[name] = error;
        this.setState({ fields, errors });
    };

    onChange = (event, name, validate) => {
        const value = event.target.value;
        const errors = validate ? validate(value, name) : false;
        this.onInputChange({ name, value, errors });
    };

    submitMessage = async (evt) => {
        evt.preventDefault();
        this.setState((state) => ({ ...state, saving: true }));

        try {
            const apiService = new ApiService();
            const res = apiService.apiConnect('/api/contact-message', 'post', this.state.fields);

            if (res) {
                this.setState({
                    fields: {
                        name: '',
                        email: '',
                        mobile: '',
                        message: '',
                    },
                    errors: {},
                    saving: false,
                });
            }
        } catch (error) {
            console.error(error);
            this.setState((state) => ({
                ...state,
                saving: false,
            }));
        }
    };

    render() {
        return (
            <form>
                <div className="row g-3">
                    <div className="col-12 col-sm-6">
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Your Name"
                            style={{ height: '55px' }}
                            value={this.state.fields.name}
                            onChange={(evt) => this.onChange(evt, 'name', this.validateField)}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <input
                            type="email"
                            className="form-control border-0"
                            placeholder="Your Email"
                            style={{ height: '55px' }}
                            value={this.state.fields.email}
                            onChange={(evt) => this.onChange(evt, 'email', this.validateField)}
                        />
                    </div>
                    <div className="col-12 col-sm-12">
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Your Mobile"
                            style={{ height: '55px' }}
                            value={this.state.fields.mobile}
                            onChange={(evt) => this.onChange(evt, 'mobile')}
                        />
                    </div>
                    <div className="col-12">
                        <textarea
                            className="form-control border-0"
                            placeholder="Message"
                            rows={5}
                            value={this.state.fields.message}
                            onChange={(evt) => this.onChange(evt, 'message', this.validateField)}
                        ></textarea>
                    </div>
                    <div className="col-12">
                        <button disabled={this.validate()} onClick={this.submitMessage} className="btn btn-primary w-100 py-3" type="button">
                            {this.state.saving ? <BsSpinner /> : 'Submit'}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
