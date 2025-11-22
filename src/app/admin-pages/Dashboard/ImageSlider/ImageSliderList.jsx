import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, Button, Grid, CircularProgress, Typography } from '@mui/material';
import { Add as AddIcon, Image as ImageIcon } from '@mui/icons-material';
import PageHeader from '../../../layouts/admin/PageHeader/PageHeader';

import ImageSlider from './ImageSlider';
import ImageSliderForm from './ImageSliderForm';
import { saveImageSlides, loadImageSlides, deleteImageSlide, newImageSlider, closeOpenModal } from '../store/ImageSlider.slice';

export default function ImageSliderList() {
    const dispatch = useDispatch();
    const { images, isLoading, isSaving, isModalOpen } = useSelector((store) => store.imageSlider);
    const [open, setOpen] = useState(false);
    const [prevIsSaving, setPrevIsSaving] = useState(false);
    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                base64: '',
                langCode: 'fr',
                title: '',
                description: '',
            },
            errors: {},
        },
    });

    useEffect(() => {
        dispatch(loadImageSlides());
    }, [dispatch]);

    // Sync modal state with Redux
    useEffect(() => {
        setOpen(isModalOpen);
    }, [isModalOpen]);

    // Reset form on successful submission
    useEffect(() => {
        // If saving completed (was true, now false) and modal is closed, reset form
        if (prevIsSaving && !isSaving && !isModalOpen) {
            setState((state) => ({
                ...state,
                form: resetForm(),
            }));
        }
        setPrevIsSaving(isSaving);
    }, [isSaving, isModalOpen, prevIsSaving]);

    const onInputChange = ({ name, value, error }) => {
        const fields = Object.assign({}, state.form.fields);
        const errors = Object.assign({}, state.form.errors);
        fields[name] = value;
        errors[name] = error;
        setState((state) => ({ ...state, form: { fields, errors } }));
    };

    const closeModal = () => {
        const currentState = Object.assign({}, state);
        currentState.form = resetForm();
        setState(currentState);
        setOpen(false);
        dispatch(closeOpenModal());
    };

    const resetForm = () => {
        return {
            fields: {
                id: '',
                base64: '',
                langCode: 'fr',
                title: '',
                description: '',
            },
            errors: {},
        };
    };

    const handleOpen = () => {
        dispatch(newImageSlider());
        setOpen(true);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <PageHeader
                title="Image Slides"
                breadcrumbs={[{ label: 'Dashboard', onClick: () => {} }, { label: 'Pages', onClick: () => {} }, { label: 'Image Slides' }]}
                action={
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} size="small">
                        New Image Slide
                    </Button>
                }
            />
            <Card sx={{ width: '100%' }}>
                <CardContent sx={{ width: '100%', pt: 3, px: { xs: 2, sm: 3 } }}>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : images.length === 0 ? (
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
                            <ImageIcon
                                sx={{
                                    fontSize: 64,
                                    color: 'text.secondary',
                                    mb: 2,
                                    opacity: 0.5,
                                }}
                            />
                            <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary', fontWeight: 600 }}>
                                No Image Slides
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center', maxWidth: '400px' }}>
                                Get started by creating your first image slide. Click the &quot;New Image Slide&quot; button to add one.
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleOpen}
                                sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                            >
                                New Image Slide
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%' }}>
                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                {images.map((image, index) => (
                                    <Grid item key={index} size={4}>
                                        <ImageSlider
                                            image={image}
                                            deleteImage={(id) => {
                                                dispatch(deleteImageSlide(id));
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </CardContent>
            </Card>

            <ImageSliderForm
                open={open}
                onClose={closeModal}
                addTranslationModal={state.addTranslationModal}
                editModal={state.editModal}
                form={state.form}
                onInputChange={onInputChange}
                saveImage={() => {
                    dispatch(saveImageSlides(state.form.fields));
                }}
                savingStatus={isSaving}
            />
        </Box>
    );
}
