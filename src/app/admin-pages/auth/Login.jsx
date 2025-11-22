import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Button, Typography, Alert, CircularProgress, TextField } from '@mui/material';
import AdminThemeProvider from '../../layouts/admin/ThemeProvider';
import { loginUser } from './auth.service';

export default function Login(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.context.hasValidSession()) navigate('/admin/image-slides');
    });

    const [loginForm, setState] = useState({
        fields: {
            email: '',
            password: '',
        },
        fieldErrors: {},
        backendError: undefined,
        logging: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const fields = Object.assign({}, loginForm.fields);
        const fieldErrors = Object.assign({}, loginForm.fieldErrors);

        fields[name] = value;

        // Validate on change
        if (name === 'email') {
            fieldErrors[name] = value ? '' : 'Email is required';
        } else if (name === 'password') {
            fieldErrors[name] = value ? '' : 'Password is required';
        }

        setState((state) => ({ ...state, fields, fieldErrors }));
    };

    const validate = () => {
        const credentails = loginForm.fields;
        const fieldErrors = loginForm.fieldErrors;
        const errorMessages = Object.keys(fieldErrors).filter((e) => fieldErrors[e]);

        if (!credentails.email) return true;
        if (!credentails.password) return true;
        if (errorMessages.length) return true;
        return false;
    };

    const loginSubmit = async (evt) => {
        evt.preventDefault();
        if (validate()) return;
        setState((state) => ({ ...state, logging: true }));

        const { token, user } = await loginUser(loginForm.fields, handleLoginExecption);
        if (token) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('isLoggedIn', true);
            props.context.setLoginStatus();
            setState((state) => ({
                ...state,
                fields: {
                    email: '',
                    password: '',
                },
                logging: false,
                fieldErrors: {},
            }));
        }
    };

    const handleLoginExecption = (error) => {
        setState((state) => ({
            ...state,
            backendError: error.response.data,
            logging: false,
        }));
    };

    return (
        <div className="admin-layout">
            <AdminThemeProvider>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f9fbfd',
                        p: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Card
                            sx={{
                                width: '100%',
                                borderRadius: 3,
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                    <img
                                        src="/assets/images/logo/normal.webp"
                                        alt="Alliance Lowa"
                                        style={{
                                            maxWidth: '200px',
                                            height: 'auto',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
                                    Account Login
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                                    Welcome back! Log In with your Email, Phone number or QR code
                                </Typography>
                                <Box component="form" onSubmit={loginSubmit}>
                                    <Box sx={{ mb: 2 }}>
                                        <TextField
                                            name="email"
                                            type="email"
                                            label="Email"
                                            value={loginForm.fields.email}
                                            onChange={handleInputChange}
                                            error={!!loginForm.fieldErrors.email}
                                            helperText={loginForm.fieldErrors.email}
                                            fullWidth
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#f5f5f5',
                                                    '& fieldset': {
                                                        borderColor: '#e0e0e0',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#048049',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#048049',
                                                        borderWidth: '2px',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        padding: '14px 16px',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ mb: 3 }}>
                                        <TextField
                                            name="password"
                                            type="password"
                                            label="Password"
                                            value={loginForm.fields.password}
                                            onChange={handleInputChange}
                                            error={!!loginForm.fieldErrors.password}
                                            helperText={loginForm.fieldErrors.password}
                                            fullWidth
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#f5f5f5',
                                                    '& fieldset': {
                                                        borderColor: '#e0e0e0',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#048049',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#048049',
                                                        borderWidth: '2px',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        padding: '14px 16px',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        disabled={validate() || loginForm.logging}
                                        sx={{ mb: 2, backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                                    >
                                        {loginForm.logging ? <CircularProgress size={20} color="inherit" /> : 'Log In'}
                                    </Button>
                                    {loginForm.backendError && (
                                        <Alert severity="error" sx={{ mb: 2 }}>
                                            {loginForm.backendError}
                                        </Alert>
                                    )}
                                    <Box textAlign="center">
                                        <Link
                                            to="/auth/forgot"
                                            style={{
                                                color: '#048049',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Forgot password?
                                        </Link>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </AdminThemeProvider>
        </div>
    );
}
