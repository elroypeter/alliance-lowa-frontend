import React from "react";
import Router from "./routes/router";
import { AuthContext } from "./shared/AuthContext";
import { getImageSlider } from "./web-pages/website.service";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoggedIn: !!sessionStorage.getItem("isLoggedIn"),
        sessionToken: sessionStorage.getItem("token"),
        loggedInUser: sessionStorage.getItem("user"),
        imageSlides: [],
    };

    componentDidMount() {
        this.startSessionTimer();
    }

    componentDidUpdate() {
        if (this.sessionInterval) clearInterval(this.sessionInterval);
        this.startSessionTimer();
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
        return payload["exp"] * 1000 > dateNow.getTime() ? true : false;
    };

    startSessionTimer = () => {
        if (this.state.isLoggedIn) {
            this.sessionInterval = setInterval(() => {
                if (!this.hasValidSession()) {
                    sessionStorage.clear();
                    this.setLoginStatus();
                }
            }, 5000);
        }
    };

    getUser = () => {
        return this.state.loggedInUser;
    };

    getImageSlides = () => {
        getImageSlider()
            .then((res) => {
                this.setState({ imageSlides: res.data });
            })
            .catch(console.error);
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
                    imageSlides={this.state.imageSlides}
                    getImageSlides={this.getImageSlides}
                />
            </AuthContext.Provider>
        );
    }
}
