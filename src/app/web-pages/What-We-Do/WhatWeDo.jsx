import React from 'react';
import WebBreadCrumb from '../../components/WebBreadCrumb/WebBreadCrumb';
import ProjectDetails from './ProjectDetails';
import { useTranslation } from 'react-i18next';

export default function WhatWeDo() {
    const { t } = useTranslation();

    return (
        <>
            <WebBreadCrumb page={t('header_what_we_do')} />
            <ProjectDetails />
        </>
    );
}
