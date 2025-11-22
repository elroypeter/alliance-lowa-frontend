import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Account from './Account';
import { AuthContext } from '../../../shared/AuthContext';

export default function Header() {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: 'white',
                color: 'text.primary',
                top: 0,
                left: { xs: 0, md: '280px' },
                right: 0,
                width: { xs: '100%', md: 'calc(100% - 280px)' },
                borderRadius: 0,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ justifyContent: 'flex-end', py: 1.5, px: 2, minHeight: '64px !important', width: '100%' }}>
                <AuthContext.Consumer>{(context) => <Account context={context} />}</AuthContext.Consumer>
            </Toolbar>
        </AppBar>
    );
}
