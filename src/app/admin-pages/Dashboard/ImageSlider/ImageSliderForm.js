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
                            {props.editModal ? 'Edit Image Slider' : 'New Image Slider'}
                        </h5>
                        <button
                            id="closeSliderModal"
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
                                        formType="file"
                                        label="Image"
                                        value={props.form.fields.image}
                                        onInputChange={props.onInputChange}
                                        config={{
                                            viewport: {
                                                width: 350,
                                                height: 250,
                                            },
                                        }}
                                    />
                                </div>
                                <div className="col-12 mb-3">
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
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.closeModal}>
                            Close
                        </button>
                        {props.editModal ? (
                            <button onClick={() => props.updateImage(props.form.fields.id)} type="button" className="btn btn-primary">
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
