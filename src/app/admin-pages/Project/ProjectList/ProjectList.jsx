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
import ProjectForm from './ProjectForm';
import { loadProjects, closeOpenModal, newProject, saveProject, publicProject, deleteProject } from '../store/Project.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ProjectList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projects, isLoading, isSaving, isModalOpen } = useSelector((state) => state.project);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                title: '',
                langCode: '',
                description: '',
            },
            errors: {},
        },
    });

    useEffect(() => {
        dispatch(loadProjects());
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
        dispatch(newProject());
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
            verticalAlign: 'middle',
            renderCell: (params) => {
                const isPublished = params.row.isPublished?.status;
                return (
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Tooltip title="View">
                            <IconButton size="small" onClick={() => navigate(`/admin/projects/${params.row.id}/${params.row.slug}`)} color="primary">
                                <VisibilityIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={isPublished ? 'Unpublish' : 'Publish'}>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    dispatch(publicProject({ id: params.row.id, status: !isPublished }));
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
                                    if (window.confirm('Are you sure you want to delete this project?')) {
                                        dispatch(deleteProject(params.row.id));
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

    const rows = projects.map((project, index) => ({
        id: project.id || index + 1,
        ...project,
    }));

    return (
        <Box>
            <PageHeader
                title="Projects"
                breadcrumbs={[{ label: 'Dashboard', onClick: () => {} }, { label: 'Pages', onClick: () => {} }, { label: 'Projects' }]}
                action={
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} size="small">
                        New Project
                    </Button>
                }
            />
            <Card>
                <CardContent sx={{ pt: 3 }}>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : projects.length === 0 ? (
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
                                No Projects
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center', maxWidth: '400px' }}>
                                Get started by creating your first project. Click the &quot;New Project&quot; button to add one.
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleOpen}
                                sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                            >
                                New Project
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

            <ProjectForm
                open={open}
                onClose={closeModal}
                form={state.form}
                onInputChange={onInputChange}
                updateProject={() => {}}
                saveProject={() => {
                    dispatch(saveProject(state.form.fields));
                }}
                savingStatus={isSaving}
            />
        </Box>
    );
}
