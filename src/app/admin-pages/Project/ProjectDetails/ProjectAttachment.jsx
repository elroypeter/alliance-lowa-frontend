import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Button, CircularProgress, IconButton, Grid, Typography } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ProjectNewImage from './ProjectNewImage';
import { saveProjectAttachment, newAttachmentModal, closeAttachmentModal, deleteProjectAttachment } from '../store/ProjectDetails.slice';
import { getImageName } from '../../../utils/externals.util';
import { baseUrl } from '../../../services/ApiService';

export default function ProjectAttachment() {
    const dispatch = useDispatch();
    const { details, isLoading, isAttachmentModalOpen } = useSelector((state) => state.projectDetails);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        newImage: {
            fields: {
                base64: '',
                isVideo: false,
            },
            errors: {},
        },
    });

    // Sync modal state with Redux
    useEffect(() => {
        setOpen(isAttachmentModalOpen);
    }, [isAttachmentModalOpen]);

    const onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, state.newImage.fields);
        const errors = Object.assign({}, state.newImage.errors);
        fields[name] = value;
        errors[name] = error;
        setState((state) => ({ ...state, newImage: { fields, errors } }));
    };

    const resetForm = () => {
        return {
            fields: {
                base64: '',
                isVideo: false,
            },
            errors: {},
        };
    };

    const closeModal = () => {
        const currentState = Object.assign({}, state);
        currentState.newImage = resetForm();
        setState(currentState);
        setOpen(false);
        dispatch(closeAttachmentModal());
    };

    const handleOpenAddAttachment = () => {
        dispatch(newAttachmentModal());
        setOpen(true);
    };

    return (
        <Box sx={{ width: '100%', mb: 3 }}>
            <Card sx={{ width: '100%' }}>
                <CardContent sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Project Attachments
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddAttachment}
                            size="small"
                            sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                        >
                            Add Attachment File
                        </Button>
                    </Box>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            {details.attachments?.map((image, index) => (
                                <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            boxShadow: 2,
                                            '&:hover': {
                                                boxShadow: 4,
                                            },
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => {
                                                dispatch(deleteProjectAttachment(image.id));
                                            }}
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                backgroundColor: 'error.main',
                                                color: 'white',
                                                zIndex: 1,
                                                '&:hover': {
                                                    backgroundColor: 'error.dark',
                                                },
                                            }}
                                            size="small"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <Box
                                            component="img"
                                            src={baseUrl() + '/images' + getImageName(image.filePath)}
                                            alt={`Attachment ${index + 1}`}
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </CardContent>
            </Card>

            <ProjectNewImage
                open={open}
                onClose={closeModal}
                form={state.newImage}
                onInputChange={onInputChange}
                saveImage={() => {
                    dispatch(saveProjectAttachment({ id: details.id, data: state.newImage.fields }));
                }}
            />
        </Box>
    );
}
