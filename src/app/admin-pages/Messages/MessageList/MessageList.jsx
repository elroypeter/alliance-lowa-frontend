import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Button, CircularProgress, Typography, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FolderOpen as FolderOpenIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PageHeader from '../../../layouts/admin/PageHeader/PageHeader';
import { loadMessages, deleteMessage } from '../store/Message.slice';
import { useNavigate } from 'react-router-dom';

export default function MessageList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, messages } = useSelector((state) => state.message);

    useEffect(() => {
        dispatch(loadMessages());
    }, [dispatch]);

    const columns = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'name', headerName: 'Name', width: 200, flex: 1 },
        { field: 'email', headerName: 'Email', width: 250, flex: 1 },
        { field: 'mobile', headerName: 'Mobile', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Tooltip title="View">
                            <IconButton size="small" onClick={() => navigate(`/admin/messages/${params.row.id}`)} color="primary">
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this message?')) {
                                        dispatch(deleteMessage(params.row.id));
                                    }
                                }}
                                color="error"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];

    const rows = messages.map((message, index) => ({
        id: message.id || index + 1,
        ...message,
    }));

    return (
        <Box>
            <PageHeader
                title="Messages"
                breadcrumbs={[{ label: 'Dashboard', onClick: () => {} }, { label: 'Pages', onClick: () => {} }, { label: 'Messages' }]}
            />
            <Card>
                <CardContent sx={{ pt: 3 }}>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : messages.length === 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                py: 8,
                                px: 2,
                            }}
                        >
                            <FolderOpenIcon
                                sx={{
                                    fontSize: 64,
                                    color: 'text.secondary',
                                    mb: 2,
                                    opacity: 0.5,
                                }}
                            />
                            <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary', fontWeight: 600 }}>
                                No Messages
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center', maxWidth: '400px' }}>
                                There are no messages to display. Messages from the contact form will appear here.
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10, 25, 50]}
                                disableSelectionOnClick
                                sx={{
                                    '& .MuiDataGrid-cell:focus': {
                                        outline: 'none',
                                    },
                                }}
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
