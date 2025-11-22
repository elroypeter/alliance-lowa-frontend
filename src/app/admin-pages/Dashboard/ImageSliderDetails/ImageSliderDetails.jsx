import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Button, Tabs, Tab, CircularProgress, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { baseUrl } from '../../../services/ApiService';
import { getImageName } from '../../../utils/externals.util';
import {
    loadImageSlideDetails,
    newTranslation,
    saveImageTranslation,
    deleteImageTranslation,
    editTranslation,
    closeOpenModal,
    updateTranslation,
} from '../store/ImageSliderDetails.slice';
import ImageSliderForm from '../ImageSlider/ImageSliderForm';
import PageHeader from '../../../layouts/admin/PageHeader/PageHeader';

export default function ImageSliderDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { langs } = useSelector((state) => state.language);
    const { imageSliderDetails, isLoading, isModalOpen, isSaving, isTranslation, isModelEdit } = useSelector((state) => state.imageSliderDetails);
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTranslation, setSelectedTranslation] = useState(null);

    useEffect(() => {
        dispatch(loadImageSlideDetails(params.id));
    }, [dispatch, params.id]);

    // Sync modal state with Redux
    useEffect(() => {
        setOpen(isModalOpen);
    }, [isModalOpen]);

    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                langCode: 'fr',
                title: '',
                description: '',
            },
            errors: {},
        },
    });

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

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

    const handleOpenAddTranslation = () => {
        dispatch(newTranslation());
        setOpen(true);
    };

    const editSliderTranslation = (data) => {
        const currentState = Object.assign({}, state);
        currentState.form.fields = {
            ...data,
            translation_id: data.id, // Map id to translation_id for the form
        };
        setState(currentState);
        dispatch(editTranslation());
        setOpen(true);
        setAnchorEl(null);
    };

    const resetForm = () => {
        return {
            fields: {
                id: '',
                langCode: 'fr',
                title: '',
                description: '',
            },
            errors: {},
        };
    };

    const handleMenuOpen = (event, translation) => {
        setAnchorEl(event.currentTarget);
        setSelectedTranslation(translation);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTranslation(null);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <PageHeader
                title="Image Slide Details"
                breadcrumbs={[
                    { label: 'Dashboard', onClick: () => {} },
                    { label: 'Pages', onClick: () => {} },
                    { label: 'Image Slides', onClick: () => navigate('/admin/image-slides') },
                    { label: 'Details' },
                ]}
                action={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/admin/image-slides')}
                            size="small"
                            sx={{
                                borderColor: '#048049',
                                color: '#048049',
                                '&:hover': { borderColor: '#036a3d', backgroundColor: 'rgba(4, 128, 73, 0.04)' },
                            }}
                        >
                            Back
                        </Button>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddTranslation} size="small">
                            Add Translation
                        </Button>
                    </Box>
                }
            />
            {!isLoading && imageSliderDetails?.filePath && (
                <Card sx={{ width: '100%', mb: 3 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={baseUrl() + '/images' + getImageName(imageSliderDetails.filePath)}
                        alt="Image Preview"
                        sx={{ objectFit: 'cover' }}
                    />
                </Card>
            )}
            <Card sx={{ width: '100%' }}>
                <CardContent sx={{ width: '100%', pt: 3 }}>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ borderRight: 1, borderColor: 'divider', minWidth: 200 }}>
                                <Tabs
                                    orientation="vertical"
                                    value={tabIndex}
                                    onChange={handleTabChange}
                                    sx={{ borderRight: 1, borderColor: 'divider' }}
                                >
                                    {imageSliderDetails?.translations?.map(({ langCode }, index) => (
                                        <Tab
                                            key={index}
                                            label={langs[langCode]?.name || langCode}
                                            sx={{ textAlign: 'left', alignItems: 'flex-start' }}
                                        />
                                    ))}
                                </Tabs>
                            </Box>
                            <Box sx={{ flex: 1, position: 'relative' }}>
                                {imageSliderDetails?.translations?.map((trans, index) => (
                                    <Box key={index} role="tabpanel" hidden={tabIndex !== index} sx={{ p: 3 }}>
                                        {tabIndex === index && (
                                            <>
                                                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                                                    <IconButton onClick={(e) => handleMenuOpen(e, trans)} size="small">
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl) && selectedTranslation?.id === trans.id}
                                                        onClose={handleMenuClose}
                                                    >
                                                        <MenuItem
                                                            onClick={() => {
                                                                editSliderTranslation(trans);
                                                            }}
                                                        >
                                                            <EditIcon sx={{ mr: 1, fontSize: 18 }} />
                                                            Edit
                                                        </MenuItem>
                                                        {index !== 0 && (
                                                            <MenuItem
                                                                onClick={() => {
                                                                    dispatch(deleteImageTranslation(trans.id));
                                                                    setTabIndex(0);
                                                                    handleMenuClose();
                                                                }}
                                                                sx={{ color: 'error.main' }}
                                                            >
                                                                <DeleteIcon sx={{ mr: 1, fontSize: 18 }} />
                                                                Delete
                                                            </MenuItem>
                                                        )}
                                                    </Menu>
                                                </Box>
                                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                                    Title
                                                </Typography>
                                                <Typography variant="body1" sx={{ mb: 3 }}>
                                                    {trans.title}
                                                </Typography>
                                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                                    Description
                                                </Typography>
                                                <Typography variant="body1">{trans.description}</Typography>
                                            </>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>

            <ImageSliderForm
                open={open}
                onClose={closeModal}
                addTranslationModal={isTranslation}
                editModal={isModelEdit}
                form={state.form}
                onInputChange={onInputChange}
                saveImage={() => {
                    dispatch(saveImageTranslation({ id: params.id, data: state.form.fields }));
                }}
                updateImage={(translationId) => {
                    dispatch(
                        updateTranslation({ id: translationId || state.form.fields.translation_id || state.form.fields.id, data: state.form.fields }),
                    );
                }}
                savingStatus={isSaving}
                exlang={isTranslation ? imageSliderDetails?.translations?.map(({ langCode }) => langCode) : undefined}
            />
        </Box>
    );
}
