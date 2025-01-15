import React from 'react';
import WebBreadCrumb from '../../components/WebBreadCrumb/WebBreadCrumb';
import Partners from '../../components/partners/Partners';
import OurHistory from './OurHistory';
import { useTranslation } from 'react-i18next';

export default function WhoWeAre() {
    const { t } = useTranslation();

    return (
        <>
            <WebBreadCrumb page={t('header_who_we_are')} />
            <OurHistory />
            <Partners />
        </>
    );
}
