import React from 'react';
import { ContactForm as Form } from '../../components/Contact/ContactForm';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
    const { t } = useTranslation();

    return (
        <div className="container-fluid bg-light overflow-hidden px-lg-0">
            <div className="container contact px-lg-0">
                <div className="row g-0 mx-lg-0 align-items-stretch">
                    <div
                        className="col-lg-6 contact-text py-5 wow fadeIn"
                        data-wow-delay="0.5s"
                        style={{
                            visibility: 'visible',
                            animationDelay: '0.5s',
                            animationName: 'fadeIn',
                        }}
                    >
                        <div className="p-lg-5 ps-lg-0 h-100 d-flex flex-column">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">{t('header_contact_us')}</h1>
                            </div>
                            <p className="mb-4">{t('contact_description')}</p>
                            <Form t={t} />
                        </div>
                    </div>
                    <div className="col-lg-6 pe-lg-0 d-flex">
                        <div className="position-relative w-100" style={{ height: '100%', minHeight: '100%' }}>
                            <iframe
                                className="w-100 h-100"
                                style={{ height: '100%', border: 'none' }}
                                src="https://maps.google.com/maps?q=logu%20DRC&t=&z=9&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0"
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
