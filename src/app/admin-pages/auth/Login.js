import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../components/Form/Field";
import BsSpinner from "../../components/Spinner/BsSpinner";
import { ApiService } from "../../services/ApiService";

export default function Login(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.context.hasValidSession()) navigate("/admin/home");
    });

    const [loginForm, setState] = useState({
        fields: {
            email: "",
            password: "",
        },
        fieldErrors: {},
        backendError: "",
        logging: false,
    });

    const onInputChange = ({ name, value, errors }) => {
        const fields = Object.assign({}, loginForm.fields);
        const fieldErrors = Object.assign({}, loginForm.fieldErrors);

        fields[name] = value;
        fieldErrors[name] = errors;

        setState((state) => ({ ...state, fields, fieldErrors }));
    };

    const validate = () => {
        const credentails = loginForm.fields;
        const fieldErrors = loginForm.fieldErrors;
        const errorMessages = Object.keys(fieldErrors).filter(
            (e) => fieldErrors[e]
        );

        if (!credentails.email) return true;
        if (!credentails.password) return true;
        if (errorMessages.length) return true;
        return false;
    };

    const loginSubmit = async (evt) => {
        evt.preventDefault();
        if (validate()) return;
        setState((state) => ({ ...state, logging: true }));

        try {
            const api = new ApiService();
            const response = await api.apiConnect(
                "/login",
                "post",
                Json.stringify(loginForm.fields)
            );

            if (response) {
                const { token, ...user } = response.data;
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("isLoggedIn", true);

                props.context.setLoginStatus();

                setState((state) => ({
                    ...state,
                    fields: {
                        email: "",
                        password: "",
                    },
                    logging: false,
                    fieldErrors: {},
                }));
            }
        } catch (error) {
            setState((state) => ({
                ...state,
                backendError: error,
                logging: false,
            }));
        }
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
                                                                loginForm.fields
                                                                    .email
                                                            }
                                                            onInputChange={
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
                                                                loginForm.fields
                                                                    .password
                                                            }
                                                            onInputChange={
                                                                onInputChange
                                                            }
                                                            validate={(val) =>
                                                                val
                                                                    ? false
                                                                    : "Password is required"
                                                            }
                                                        />
                                                    </div>
                                                    <button
                                                        className="btn btn-dark text-uppercase py-2 fs-5 w-100 mt-2"
                                                        disabled={validate()}
                                                        onClick={loginSubmit}
                                                    >
                                                        {loginForm.logging ? (
                                                            <BsSpinner />
                                                        ) : (
                                                            "log in"
                                                        )}
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
