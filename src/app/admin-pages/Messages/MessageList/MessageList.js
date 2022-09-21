import React, { useEffect } from "react";
import MessageItem from "./MessageItem";

export default function MessageList(props) {
    useEffect(() => {
        if (props.messages.length > 0) {
            window?.loadDataTable("messageTable");
        }
    });

    return (
        <div className="row clearfix g-3">
            <div className="col-sm-12">
                <div className="card mb-3">
                    <div className="card-body">
                        <table
                            id="projectsTable"
                            className="table table-hover"
                            style={{ width: "100%" }}
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.messages.map((message, index) => (
                                    <MessageItem
                                        key={index}
                                        index={index}
                                        message={message}
                                        deleteProject={props.deleteMessage}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
