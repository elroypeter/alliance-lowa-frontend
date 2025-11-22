import React from 'react';
import { Box } from '@mui/material';
import CareerList from './CareerList/CareerList';

export default function Career() {
    return (
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <CareerList />
        </Box>
    );
}
