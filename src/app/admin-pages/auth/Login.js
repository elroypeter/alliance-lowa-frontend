import React, { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../../components/Form/Field";

export default function Login() {
    const [loginForm, setState] = useState({
        fields: {
            email: "",
            password: "",
        },
        errors: {},
    });

    const onInputChange = ({ name, value, errors }) => {
        const fields = Object.assign({}, loginForm.fields);
        const fieldErrors = Object.assign({}, loginForm.errors);

        fields[name] = value;
        fieldErrors[name] = errors;

        setState({ fields, fieldErrors });
    };

    return (
        <div className="admin-layout">
            <div className="main">
                <div className="body d-flex p-0 p-md-2 p-xl-5">
                    <div className="container-xxl">
                        <div className="row g-0 justify-content-center align-items-center rounded-3 mt-2 mt-md-0">
                            <div className="col-lg-6 d-flex justify-content-center align-items-center border border-secondary auth-h100 bg-secondary py-2 py-md-0">
                                <div className="d-flex flex-column p-2">
                                    <h1>Account Login</h1>
                                    <span>
                                        Welcome back! Log In with your Email,
                                        Phone number or QR code
                                    </span>
                                    <div className="mt-4 mb-3">
                                        <div className="card">
                                            <div className="card-body p-4">
                                                <form>
                                                    <div className="mb-3">
                                                        <Field
                                                            name="email"
                                                            type="text"
                                                            label="Email"
                                                            value={
                                                                loginForm.email
                                                            }
                                                            onChange={
                                                                onInputChange
                                                            }
                                                            validate={(val) =>
                                                                val
                                                                    ? false
                                                                    : "Email is required"
                                                            }
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Field
                                                            name="password"
                                                            type="password"
                                                            label="Password"
                                                            value={
                                                                loginForm.password
                                                            }
                                                            onChange={
                                                                onInputChange
                                                            }
                                                            validate={(val) =>
                                                                val
                                                                    ? false
                                                                    : "Password is required"
                                                            }
                                                        />
                                                    </div>
                                                    <button className="btn btn-dark text-uppercase py-2 fs-5 w-100 mt-2">
                                                        log in
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        to="/auth/forgot"
                                        className="text-primary text-decoration-underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
