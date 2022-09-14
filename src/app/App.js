import React from "react";
import Router from "./routes/router";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoggedIn: false,
        sessionToken: sessionStorage.getItem("token"),
    };

    setLoginStatus(status) {
        const stateChanges = { ...this.state, isLoggedIn: status };
        this.setState(stateChanges);
    }

    render() {
        return (
            <Router
                isLoggedIn={this.state.isLoggedIn}
                setLoginStatus={this.setLogginStatus}
            />
        );
    }
}
