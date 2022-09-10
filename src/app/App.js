import React from "react";
import Router from "./routes/router";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Router />;
    }
}
