import React from 'react';
import { Box } from '@mui/material';
import ProjectList from './ProjectList/ProjectList';

export default function Project() {
    return (
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <ProjectList />
        </Box>
    );
}
