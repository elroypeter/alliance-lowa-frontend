import React, { Component } from "react";
import Partners from "../../components/partners/Partners";
import Contact from "./Contact";
import Governance from "./Governance";
import Mission from "./Mission";
import Slider from "./Slider";

export default class Home extends Component {
    render() {
        return (
            <>
                <Slider></Slider>
                <Mission></Mission>
                <Governance></Governance>
                <Contact></Contact>
                <Partners></Partners>
            </>
        );
    }
}
