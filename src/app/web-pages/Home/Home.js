import React, { Component } from "react";
import Partners from "../../components/partners/Partners";
import Contact from "./Contact";
import Governance from "./Governance";
import Mission from "./Mission";
import Slider from "./Slider";
import { getImageSlider } from "../website.service";
import Projects from "./Projects";

export default class Home extends Component {
    state = {
        slides: [],
    };

    componentDidMount() {
        this.getImageSlides();
    }

    getImageSlides = () => {
        getImageSlider()
            .then((res) => {
                this.setState({ slides: res.data });
            })
            .catch(console.error);
    };

    render() {
        return (
            <>
                <Slider slides={this.state.slides}></Slider>
                <Mission></Mission>
                <Governance></Governance>
                <Projects></Projects>
                <Contact></Contact>
                <Partners></Partners>
            </>
        );
    }
}
