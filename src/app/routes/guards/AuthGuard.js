import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthGuard(props) {
    const { component: Component, isLoggedIn, hasValidSession } = props;

    return isLoggedIn && hasValidSession() ? <Component /> : <Navigate to="/auth/login" replace={true} />;
}
