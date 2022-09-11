import React from "react";
import Router from "./routes/router";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoggedIn: true,
    };

    setLoginStatus(status) {
        this.setState((state) => {
            return { ...state, isLoggedIn: status };
        });
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
