import React from 'react';
import Field from '../../../components/Form/Field';
import BsSpinner from '../../../components/Spinner/BsSpinner';

export default function ImageSliderForm(props) {
    return (
        <div className="modal fade" id="newSlider" aria-labelledby="newSliderLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="newSliderLabel">
                            {props.editModal ? 'Edit Translation' : props.addTranslationModal ? 'Add Translation' : 'New Image Slider'}
                        </h5>
                        <button
                            onClick={() => {
                                props.closeModal();
                            }}
                            id="closeSliderModal"
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                {props.editModal || props.addTranslationModal || (
                                    <div className="col-12 mb-3">
                                        <Field
                                            name="base64"
                                            formType="file"
                                            label="Image"
                                            value={props.form.fields.base64}
                                            onInputChange={props.onInputChange}
                                            config={{
                                                viewport: {
                                                    width: 350,
                                                    height: 250,
                                                },
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="col-6 mb-3">
                                    <Field
                                        formType="langCode"
                                        name="langCode"
                                        label="Language"
                                        disabled={props.editModal}
                                        value={props.form.fields.langCode}
                                        onInputChange={props.onInputChange}
                                        exlang={props.currentLangs}
                                    />
                                </div>
                                <div className="col-6 mb-3">
                                    <Field name="title" label="Title" value={props.form.fields.title} onInputChange={props.onInputChange} />
                                </div>
                                <div className="col-12">
                                    <Field
                                        formType="textArea"
                                        name="description"
                                        label="Description"
                                        value={props.form.fields.description}
                                        onInputChange={props.onInputChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={() => {
                                props.closeModal();
                            }}
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {props.editModal ? (
                            <button onClick={() => props.updateImage(props.form.fields.translation_id)} type="button" className="btn btn-primary">
                                {props.savingStatus ? <BsSpinner /> : 'Update'}
                            </button>
                        ) : (
                            <button onClick={props.saveImage} type="button" className="btn btn-primary">
                                {props.savingStatus ? <BsSpinner /> : 'Save'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
