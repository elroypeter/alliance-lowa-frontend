import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Avatar, ListItemIcon, ListItemText } from '@mui/material';
import { Lock as LockIcon, Logout as LogoutIcon } from '@mui/icons-material';

export default function Account(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOut = (evt) => {
        evt.preventDefault();
        sessionStorage.clear();
        props.context.setLoginStatus();
        handleClose();
    };

    return (
        <Box>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 1.5 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar
                    src="/assets/images/defaults/profile.svg"
                    sx={{
                        width: 40,
                        height: 40,
                        border: '2px solid',
                        borderColor: 'divider',
                    }}
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        minWidth: 200,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <LockIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Change password</ListItemText>
                </MenuItem>
                <MenuItem onClick={signOut}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Signout</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
}
