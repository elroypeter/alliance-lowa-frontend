import React from "react";
import Router from "./routes/router";
import { AuthContext } from "./shared/AuthContext";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoggedIn: false,
        sessionToken: sessionStorage.getItem("token"),
        loggedInUser: sessionStorage.getItem("user"),
    };

    setLoginStatus = () => {
        const stateChanges = Object.assign({}, this.state);
        stateChanges.isLoggedIn = sessionStorage.getItem("loginStatus");
        stateChanges.loggedInUser = JSON.parse(sessionStorage.getItem("user"));
        stateChanges.sessionToken = sessionStorage.getItem("token");

        console.log(stateChanges);

        this.setState(stateChanges);
    };

    getToken = () => {
        return this.state.sessionToken;
    };

    getUser = () => {
        return this.state.loggedInUser;
    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    setLoginStatus: this.setLoginStatus,
                    getToken: this.getToken,
                }}
            >
                <Router />
            </AuthContext.Provider>
        );
    }
}
