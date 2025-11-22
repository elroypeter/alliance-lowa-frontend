import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import {
    Image as ImageIcon,
    Work as WorkIcon,
    Article as ArticleIcon,
    BusinessCenter as BusinessCenterIcon,
    Message as MessageIcon,
    Email as EmailIcon,
} from '@mui/icons-material';
import AdminThemeProvider from './ThemeProvider';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

export function Layout() {
    let location = useLocation();

    const menuList = [
        {
            name: 'Image Slides',
            link: '/admin/image-slides',
            icon: ImageIcon,
        },
        {
            name: 'Projects',
            link: '/admin/projects',
            icon: WorkIcon,
        },
        {
            name: 'Blog & News',
            link: '/admin/news',
            icon: ArticleIcon,
        },
        {
            name: 'Careers',
            link: '/admin/careers',
            icon: BusinessCenterIcon,
        },
        {
            name: 'Messages',
            link: '/admin/messages',
            icon: MessageIcon,
        },
        {
            name: 'Subscribers',
            link: '/admin/subscribers',
            icon: EmailIcon,
        },
    ];

    const locationChange = (callback) => {
        useEffect(() => {
            callback(location.pathname);
        }, [location.pathname]);
    };

    return (
        <div className="admin-layout">
            <AdminThemeProvider>
                <Box sx={{ display: 'flex', backgroundColor: '#f9fbfd', minHeight: '100vh', width: '100%' }}>
                    <Sidebar menuList={menuList} />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            width: { xs: '100%', md: 'calc(100% - 100px)' },
                            minHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            pt: 0,
                        }}
                    >
                        <Header locationChange={locationChange} menuList={menuList} />
                        <Box
                            sx={{
                                flexGrow: 1,
                                width: '100%',
                                maxWidth: '100%',
                                mt: '100px',
                                mb: '50px',
                            }}
                        >
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </AdminThemeProvider>
        </div>
    );
}
