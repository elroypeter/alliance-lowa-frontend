import React from 'react';
import WebBreadCrumb from '../../components/WebBreadCrumb/WebBreadCrumb';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
    const { t } = useTranslation();

    return (
        <>
            <WebBreadCrumb page={t('header_contact_us')} />
            <ContactMap />
            <ContactForm t={t} />
        </>
    );
}
