import React from "react";
import Router from "./routes/router";
import { AuthContext } from "./shared/AuthContext";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoggedIn: !!sessionStorage.getItem("isLoggedIn"),
        sessionToken: sessionStorage.getItem("token"),
        loggedInUser: sessionStorage.getItem("user"),
    };

    componentDidMount() {
        this.startTimer();
    }

    componentDidUpdate() {
        if (this.sessionInterval) clearInterval(this.sessionInterval);
        this.startTimer();
    }

    componentWillUnmount() {
        if (this.sessionInterval) {
            clearInterval(this.sessionInterval);
        }
    }

    setLoginStatus = () => {
        const stateChanges = Object.assign({}, this.state);
        stateChanges.isLoggedIn = !!sessionStorage.getItem("isLoggedIn");
        stateChanges.loggedInUser = JSON.parse(sessionStorage.getItem("user"));
        stateChanges.sessionToken = sessionStorage.getItem("token");
        this.setState(stateChanges);
    };

    getToken = () => {
        return this.state.sessionToken;
    };

    hasValidSession = () => {
        if (!this.state.sessionToken) return false;

        const payload = JSON.parse(
            atob(this.state.sessionToken?.split(".")[1])
        );

        const dateNow = new Date();
        const dateDif = dateNow.getTime() - parseInt(payload["date"]);
        return dateDif >= payload["exp"] ? false : true;
    };

    startTimer = () => {
        if (this.state.isLoggedIn) {
            console.log("new timer");
            this.sessionInterval = setInterval(() => {
                if (!this.hasValidSession()) {
                    sessionStorage.clear();
                    this.setLoginStatus();
                    console.log("token expired");
                }
                console.log("token is valid");
            }, 5000);
        }
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
                    hasValidSession: this.hasValidSession,
                }}
            >
                <Router
                    isLoggedIn={this.state.isLoggedIn}
                    sessionToken={this.state.sessionToken}
                    hasValidSession={this.hasValidSession}
                />
            </AuthContext.Provider>
        );
    }
}
