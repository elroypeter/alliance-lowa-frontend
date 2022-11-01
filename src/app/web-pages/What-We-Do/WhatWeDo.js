import React from 'react';
import WebBreadCrumb from '../../components/WebBreadCrumb/WebBreadCrumb';
import ProjectDetails from './ProjectDetails';

export default function WhatWeDo() {
    return (
        <>
            <WebBreadCrumb page="What We Do" />
            <ProjectDetails />
        </>
    );
}
