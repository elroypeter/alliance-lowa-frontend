import React from 'react';
import Field from '../../../components/Form/Field';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import { useSelector } from 'react-redux';

export default function CareerForm(props) {
    const { isSaving } = useSelector((state) => state.career);
    return (
        <div className="modal fade" id="addCareerModal" aria-labelledby="addCareerModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addCareerModalLabel">
                            {props.editModal ? 'Edit Translation' : 'New Career'}
                        </h5>
                        <button
                            id="closeCareerModal"
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
                                    <Field name="title" label="Title" value={props.form.fields.title} onInputChange={props.onInputChange} />
                                </div>
                                <div className="col-12">
                                    <Field
                                        formType="editor"
                                        name="description"
                                        label="Description"
                                        value={props.form.fields.description}
                                        onInputChange={props.onInputChange}
                                        config={{
                                            plugins: ['code'],
                                        }}
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
                            <button onClick={() => props.updateCareer()} type="button" className="btn btn-primary">
                                {isSaving ? <BsSpinner /> : 'Update'}
                            </button>
                        ) : (
                            <button onClick={props.saveCareer} type="button" className="btn btn-primary">
                                {isSaving ? <BsSpinner /> : 'Save'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
