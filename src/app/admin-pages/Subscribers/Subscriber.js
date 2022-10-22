import React, { Component } from 'react';
import { getSubscribersApi, deleteSubscriberApi } from './Subscriber.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default class Subscriber extends Component {
    state = {
        subscribers: [],
    };

    componentDidMount() {
        setTimeout(() => this.getSubscribers());
    }

    getSubscribers = () => {
        getSubscribersApi()
            .then((res) => {
                this.setState((state) => ({ ...state, subscribers: res.data }));
            })
            .catch(console.error());
    };

    deleteSubscriber = (id) => {
        deleteSubscriberApi(id)
            .then(() => {
                this.getSubscribers();
            })
            .catch(console.error);
    };

    render() {
        return (
            <div className="container-xxl">
                <div className="row align-items-center">
                    <div className="border-0 mb-4">
                        <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                            <h3 className="h4 mb-0">Subscriber List</h3>
                        </div>
                    </div>
                </div>

                <div className="row clearfix g-3">
                    <div className="col-sm-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <table id="projectsTable" className="table table-hover" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.subscribers.map((subscriber, index) => (
                                            <tr key={index}>
                                                <td>{parseInt(index) + 1}</td>
                                                <td>{subscriber.email}</td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                                                        <button
                                                            onClick={() => this.deleteSubscriber(subscriber.id)}
                                                            type="button"
                                                            className="btn btn-outline-light"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} className="text-danger" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
