import React from 'react';
import WebBreadCrumb from '../../components/WebBreadCrumb/WebBreadCrumb';
import { useTranslation } from 'react-i18next';

export default function NewsCareer() {
    const { t } = useTranslation();

    return (
        <>
            <WebBreadCrumb page={t('header_news_careers')} />
        </>
    );
}
