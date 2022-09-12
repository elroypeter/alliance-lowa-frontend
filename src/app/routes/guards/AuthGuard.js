import React from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard(props) {
    const { component: Component, isLoggedIn } = props;

    return isLoggedIn ? (
        <Component />
    ) : (
        <Navigate to="/auth/login" replace={true} />
    );
}
