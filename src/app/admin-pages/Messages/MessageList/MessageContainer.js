import React, { Component } from "react";
import MessageList from "./MessageList";

import { getMessageApi, deleteMessageApi } from "../Message.service";

export default class ProjectContainer extends Component {
    state = {
        messages: [],
    };

    componentDidMount() {
        this.modalBtn = document.getElementById("newProjectModalBtn");
        setTimeout(() => this.getMessages());
    }

    getMessages = () => {
        getMessageApi()
            .then((res) => {
                this.setState((state) => ({ ...state, messages: res.data }));
            })
            .catch(console.error());
    };

    deleteMessage = (id) => {
        deleteMessageApi(id)
            .then(() => {
                this.getMessages();
            })
            .catch(console.error);
    };

    render() {
        return (
            <>
                <div className="row align-items-center">
                    <div className="border-0 mb-4">
                        <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                            <h3 className="h4 mb-0">Message List</h3>
                        </div>
                    </div>
                </div>
                <MessageList
                    deleteProject={this.deleteProject}
                    messages={this.state.messages}
                />
            </>
        );
    }
}
