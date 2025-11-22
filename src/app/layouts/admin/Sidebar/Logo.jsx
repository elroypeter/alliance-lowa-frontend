import React from 'react';
import { Box, Typography } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';

export default function Logo() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textDecoration: 'none',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                }}
            >
                <DashboardIcon sx={{ color: 'white', fontSize: '28px' }} />
            </Box>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    color: 'white',
                    fontSize: '20px',
                    letterSpacing: '0.5px',
                }}
            >
                Alliance Lowa
            </Typography>
        </Box>
    );
}
