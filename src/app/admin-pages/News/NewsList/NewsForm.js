import React from 'react';
import Field from '../../../components/Form/Field';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import { useSelector } from 'react-redux';

export default function NewsForm(props) {
    const { isSaving } = useSelector((state) => state.news);
    return (
        <div className="modal fade" id="addNewsModal" aria-labelledby="addNewsModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addNewsModalLabel">
                            {props.editModal ? 'Edit Translation' : props.addTranslationModal ? 'Add Translation' : 'New Blog News'}
                        </h5>
                        <button
                            id="closeNewsModal"
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
                            <button onClick={() => props.updateNews(props.form.fields.id)} type="button" className="btn btn-primary">
                                {isSaving ? <BsSpinner /> : 'Update'}
                            </button>
                        ) : (
                            <button onClick={props.saveNews} type="button" className="btn btn-primary">
                                {isSaving ? <BsSpinner /> : 'Save'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
