import React, { useState } from 'react';
import { ApiService } from '../../../services/ApiService';
import BsSpinner from '../../../components/Spinner/BsSpinner';
import { useTranslation } from 'react-i18next';

export default function NewsLetter() {
    const { t } = useTranslation();

    const [form, setState] = useState({
        email: '',
        saving: false,
    });

    const onFormChange = (evt) => {
        if (evt.target.value) {
            setState((state) => ({ ...state, email: evt.target.value }));
        }
    };

    const validate = () => {
        return form.email !== '' ? true : false;
    };

    const saveSubscriber = async () => {
        try {
            setState((state) => ({ ...state, saving: true }));
            const api = new ApiService();
            const res = await api.apiConnect('/api/subscriber', 'post', {
                email: form.email,
            });

            if (res) {
                setState(() => ({
                    email: '',
                    saving: false,
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="col-lg-4 col-md-6">
            <h4 className="text-light mb-4">{t('footer_news_letter')}</h4>
            <p>{t('footer_news_letter_desc')}</p>
            <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                <input
                    value={form.email}
                    className="form-control border-0 w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder={t('footer_placeholder')}
                    onChange={onFormChange}
                />
                <button
                    disabled={!validate()}
                    type="button"
                    value={form.email}
                    onClick={saveSubscriber}
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                    {form.saving ? <BsSpinner /> : t('footer_signup')}
                </button>
            </div>
        </div>
    );
}
