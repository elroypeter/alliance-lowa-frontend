import React from 'react';
import Field from '../../../components/Form/Field';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { closeOpenModal } from '../store/ProjectDetails.slice';

export default function ProjectNewImage(props) {
    const dispatch = useDispatch();
    const { isSaving } = useSelector((state) => state.projectDetails);

    return (
        <div className="modal fade" id="addAttachmentModal" aria-labelledby="newImageLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="newImageLabel">
                            Add Image
                        </h5>
                        <button
                            id="closeAttachmentModal"
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => dispatch(closeOpenModal())}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <Field
                                        name="base64"
                                        formType="image"
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
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => dispatch(closeOpenModal())}>
                            Close
                        </button>
                        <button onClick={props.saveImage} type="button" className="btn btn-primary">
                            {isSaving ? <BsSpinner /> : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
