import React, { Component } from "react";
import MessageContainer from "./MessageList/MessageContainer";

export default class Message extends Component {
    render() {
        return (
            <div className="container-xxl">
                <MessageContainer />
            </div>
        );
    }
}
