import React from 'react';
import { ContactForm as Form } from '../../components/Contact/ContactForm';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
    const { t } = useTranslation();

    return (
        <div className="container-fluid bg-light overflow-hidden px-lg-0">
            <div className="container contact px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div
                        className="col-lg-6 contact-text py-5 wow fadeIn"
                        data-wow-delay="0.5s"
                        style={{
                            visibility: 'visible',
                            animationDelay: '0.5s',
                            animationName: 'fadeIn',
                        }}
                    >
                        <div className="p-lg-5 ps-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">{t('header_contact_us')}</h1>
                            </div>
                            <p className="mb-4">{t('contact_description')}</p>
                            <Form t={t} />
                        </div>
                    </div>
                    <div className="col-lg-6 pe-lg-0" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <iframe
                                className="position-absolute w-100 h-100"
                                style={{ objectFit: 'cover' }}
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
