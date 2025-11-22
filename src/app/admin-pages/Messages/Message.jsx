import React from 'react';
import { Box } from '@mui/material';
import MessageList from './MessageList/MessageList';

export default function Message() {
    return (
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <MessageList />
        </Box>
    );
}
