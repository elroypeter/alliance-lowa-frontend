import React from 'react';
import { Box } from '@mui/material';
import NewsList from './NewsList/NewsList';

export default function News() {
    return (
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <NewsList />
        </Box>
    );
}
