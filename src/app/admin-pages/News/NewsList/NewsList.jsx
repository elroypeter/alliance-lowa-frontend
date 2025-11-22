import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Button, CircularProgress, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    Add as AddIcon,
    FolderOpen as FolderOpenIcon,
    Visibility as VisibilityIcon,
    Campaign as CampaignIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import PageHeader from '../../../layouts/admin/PageHeader/PageHeader';
import NewsForm from './NewsForm';
import { loadNews, closeOpenModal, newNews, saveNews, publicNews, deleteNews } from '../store/News.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function NewsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { news, isLoading, isSaving, isModalOpen } = useSelector((state) => state.news);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                base64: '',
                title: '',
                langCode: '',
                description: '',
            },
            errors: {},
        },
    });

    useEffect(() => {
        dispatch(loadNews());
    }, [dispatch]);

    useEffect(() => {
        setOpen(isModalOpen);
    }, [isModalOpen]);

    const onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, state.form.fields);
        const errors = Object.assign({}, state.form.errors);
        fields[name] = value;
        errors[name] = error;
        setState((state) => ({ ...state, form: { fields, errors } }));
    };

    const resetForm = () => {
        return {
            fields: {
                id: '',
                base64: '',
                title: '',
                langCode: '',
                description: '',
            },
            errors: {},
        };
    };

    const closeModal = () => {
        const currentState = Object.assign({}, state);
        currentState.form = resetForm();
        setState(currentState);
        setOpen(false);
        dispatch(closeOpenModal());
    };

    const handleOpen = () => {
        dispatch(newNews());
        setOpen(true);
    };

    const columns = [
        { field: 'id', headerName: '#', width: 70 },
        {
            field: 'title',
            headerName: 'Title',
            width: 300,
            flex: 1,
            valueGetter: (value, row) => {
                return row.translations?.[0]?.title || '';
            },
        },
        {
            field: 'languages',
            headerName: 'Languages',
            width: 200,
            sortable: false,
            renderCell: (params) => {
                const languages = params.row.translations?.map((t) => t.langCode).join(' | ') || '';
                return <Chip label={languages} color="warning" size="small" sx={{ fontSize: '0.75rem', height: '24px' }} />;
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                const isPublished = params.row.isPublished?.status;
                return (
                    <Chip
                        label={isPublished ? 'Published' : 'Not Published'}
                        color={isPublished ? 'success' : 'error'}
                        size="small"
                        sx={{ fontSize: '0.75rem', height: '24px' }}
                    />
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const isPublished = params.row.isPublished?.status;
                return (
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
                        <Tooltip title="View">
                            <IconButton size="small" onClick={() => navigate(`/admin/news/${params.row.id}/${params.row.slug}`)} color="primary">
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={isPublished ? 'Unpublish' : 'Publish'}>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    dispatch(publicNews({ id: params.row.id, status: !isPublished }));
                                }}
                                color={isPublished ? 'default' : 'success'}
                            >
                                <CampaignIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this news article?')) {
                                        dispatch(deleteNews(params.row.id));
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

    const rows = news.map((item, index) => ({
        id: item.id || index + 1,
        ...item,
    }));

    return (
        <Box>
            <PageHeader
                title="Blog & News"
                breadcrumbs={[{ label: 'Dashboard', onClick: () => {} }, { label: 'Pages', onClick: () => {} }, { label: 'Blog & News' }]}
                action={
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} size="small">
                        New News
                    </Button>
                }
            />
            <Card>
                <CardContent sx={{ pt: 3 }}>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : news.length === 0 ? (
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
                                No News Articles
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center', maxWidth: '400px' }}>
                                Get started by creating your first news article. Click the &quot;New News&quot; button to add one.
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleOpen}
                                sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                            >
                                New News
                            </Button>
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

            <NewsForm
                open={open}
                onClose={closeModal}
                form={state.form}
                onInputChange={onInputChange}
                updateNews={() => {}}
                saveNews={() => {
                    dispatch(saveNews(state.form.fields));
                }}
                savingStatus={isSaving}
            />
        </Box>
    );
}
