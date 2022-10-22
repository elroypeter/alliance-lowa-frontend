import React from 'react';
import WebBreadCrumb from '../../components/WebBreadCrumb/WebBreadCrumb';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';

export default function ContactUs() {
    return (
        <>
            <WebBreadCrumb page="Contact Us" />
            <ContactMap />
            <ContactForm />
        </>
    );
}
