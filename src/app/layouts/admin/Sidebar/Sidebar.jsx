import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    Divider,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import Logo from './Logo';

const drawerWidth = 280;

export default function Sidebar({ menuList }) {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box
            sx={{
                p: 0,
                height: '100%',
                backgroundColor: '#036a3d',
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
            }}
        >
            <Box sx={{ p: 3, pb: 2 }}>
                <Logo />
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'auto', px: 2 }}>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        px: 2,
                        py: 1.5,
                        display: 'block',
                    }}
                >
                    Pages
                </Typography>
                <List sx={{ mt: 0.5 }}>
                    {menuList.map((item) => {
                        const isActive = location.pathname === item.link || location.pathname.startsWith(item.link + '/');
                        return (
                            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    onClick={() => navigate(item.link)}
                                    selected={isActive}
                                    sx={{
                                        color: 'white',
                                        borderRadius: 2,
                                        py: 1.25,
                                        px: 2,
                                        '&.Mui-selected': {
                                            color: '#048049',
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: '#048049',
                                            },
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                        {React.createElement(item.icon, { sx: { fontSize: '18px' } })}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.name}
                                        primaryTypographyProps={{
                                            fontSize: '0.875rem',
                                            fontWeight: isActive ? 600 : 400,
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: 'none',
                    borderRadius: 0,
                    margin: 0,
                    height: '100vh',
                },
            }}
        >
            {drawer}
        </Drawer>
    );
}
