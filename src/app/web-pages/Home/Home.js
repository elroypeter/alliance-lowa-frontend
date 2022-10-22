import React, { Component } from 'react';
import Partners from '../../components/partners/Partners';
import Contact from './Contact';
import Governance from './Governance';
import Mission from './Mission';
import Slider from './Slider';

import Projects from './Projects';

export default class Home extends Component {
    componentDidMount() {
        if (this.props.imageSlides.length <= 0) {
            this.props.getImageSlides();
        }
    }

    render() {
        return (
            <>
                <Slider slides={this.props.imageSlides}></Slider>
                <Mission></Mission>
                <Governance></Governance>
                <Projects></Projects>
                <Contact></Contact>
                <Partners></Partners>
            </>
        );
    }
}
