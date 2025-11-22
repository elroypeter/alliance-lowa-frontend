import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FolderOpen as FolderOpenIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PageHeader from '../../layouts/admin/PageHeader/PageHeader';
import { loadSubcribers, deleteSubcribers } from './store/Subscriber.slice';

export default function Subscriber() {
    const dispatch = useDispatch();
    const { isLoading, subscribers } = useSelector((state) => state.subscriber);

    useEffect(() => {
        dispatch(loadSubcribers());
    }, [dispatch]);

    const columns = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'email', headerName: 'Email', width: 300, flex: 1 },
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
                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this subscriber?')) {
                                        dispatch(deleteSubcribers(params.row.id));
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

    const rows = subscribers.map((sub, index) => ({
        id: sub.id || index + 1,
        ...sub,
    }));

    return (
        <Box>
            <PageHeader
                title="Subscribers"
                breadcrumbs={[{ label: 'Dashboard', onClick: () => {} }, { label: 'Pages', onClick: () => {} }, { label: 'Subscribers' }]}
            />
            <Card>
                <CardContent sx={{ pt: 3 }}>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : subscribers.length === 0 ? (
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
                                No Subscribers
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center', maxWidth: '400px' }}>
                                There are no subscribers to display. Subscribers from the newsletter signup will appear here.
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
