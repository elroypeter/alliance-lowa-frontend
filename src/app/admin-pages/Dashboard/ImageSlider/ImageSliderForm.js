import React, { useState } from "react";
import Field from "../../../components/Form/Field";

export default function ImageSliderForm(props) {
    const [form, setState] = useState({
        fields: {
            image: "",
            title: "",
            description: "",
        },
        errors: {},
    });

    const onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, form.fields);
        const errors = Object.assign({}, form.errors);

        fields[name] = value;
        errors[name] = error;

        setState((state) => ({ ...state, fields, errors }));
    };

    return (
        <div
            className="modal fade"
            id="newSlider"
            aria-labelledby="newSliderLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="newSliderLabel">
                            {props.editModal
                                ? "Edit Image Slider"
                                : "New Image Slider"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={props.closeModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <Field
                                        name="image"
                                        formType="image"
                                        label="Image"
                                        value={form.fields.image}
                                        onInputChange={onInputChange}
                                        config={{
                                            viewport: {
                                                width: 300,
                                                height: 200,
                                            },
                                        }}
                                        validate={(val) =>
                                            val ? false : "Email is required"
                                        }
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <Field
                                        name="title"
                                        label="Title"
                                        value={form.fields.title}
                                        onInputChange={onInputChange}
                                    />
                                </div>
                                <div className="col-12">
                                    <Field
                                        formType="textArea"
                                        name="description"
                                        label="Description"
                                        value={form.fields.description}
                                        onInputChange={onInputChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={props.closeModal}
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
