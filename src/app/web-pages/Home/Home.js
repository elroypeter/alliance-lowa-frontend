import React from 'react';
import Partners from '../../components/partners/Partners';
import Contact from './Contact';
import Governance from './Governance';
import Mission from './Mission';
import Slider from './Slider';
import Projects from './Projects';

export default function Home() {
    return (
        <>
            <Slider></Slider>
            <Mission></Mission>
            <Governance></Governance>
            <Projects></Projects>
            <Contact></Contact>
            <Partners></Partners>
        </>
    );
}
