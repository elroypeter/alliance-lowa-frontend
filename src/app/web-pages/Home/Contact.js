import React from 'react';
import { ContactForm } from '../../components/Contact/ContactForm';
import { useTranslation } from 'react-i18next';

export default function Contact() {
    const { t } = useTranslation();

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container quote px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div className="col-lg-6 quote-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">{t('header_contact_us')}</h1>
                            </div>
                            <p className="mb-4 pb-2">
                                {t('contact_sub_title_1')}
                                <a href="mailto:info@alliancelowa.org"> info@alliancelowa.org</a>, {t('contact_sub_title_2')}
                            </p>
                            <ContactForm t={t} />
                        </div>
                    </div>
                    <div className="col-lg-6 ps-lg-0" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src="assets/images/development/allowa8.jpg"
                                style={{ objectFit: 'cover' }}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
