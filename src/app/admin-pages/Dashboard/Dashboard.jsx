import React from 'react';
import { Box } from '@mui/material';
import ImageSliderList from './ImageSlider/ImageSliderList';

export default function Dashboard() {
    return (
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <ImageSliderList />
        </Box>
    );
}
