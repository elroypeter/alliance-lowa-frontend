import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Card,
    CardContent,
    Tabs,
    Tab,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import NewsForm from '../NewsList/NewsForm';
import HTMLReactParser from 'html-react-parser';
import {
    saveNewsTranslation,
    newTranslation,
    editTranslation,
    deleteNewsTranslation,
    updateNewsTranslation,
    closeTranslationModal,
} from '../store/NewsDetails.slice';

export default function NewsTranslation() {
    const dispatch = useDispatch();
    const { langs } = useSelector((state) => state.language);
    const { details, isLoading, isTranslationModalOpen, isModalEdit, isTranslation, isSaving } = useSelector((state) => state.newsDetails);
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTranslation, setSelectedTranslation] = useState(null);
    const [prevIsSaving, setPrevIsSaving] = useState(false);
    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                langCode: '',
                title: '',
                description: '',
            },
            errors: {},
        },
    });

    // Sync modal state with Redux
    useEffect(() => {
        setOpen(isTranslationModalOpen);
    }, [isTranslationModalOpen]);

    // Reset form on successful submission
    useEffect(() => {
        // If saving completed (was true, now false) and modal is closed, reset form
        if (prevIsSaving && !isSaving && !isTranslationModalOpen) {
            setState((state) => ({
                ...state,
                form: resetForm(),
            }));
        }
        setPrevIsSaving(isSaving);
    }, [isSaving, isTranslationModalOpen, prevIsSaving]);

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

    const resetForm = () => {
        return {
            fields: {
                id: '',
                langCode: '',
                title: '',
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
        dispatch(closeTranslationModal());
    };

    const editSliderTranslation = (data) => {
        const currentState = Object.assign({}, state);
        currentState.form.fields = {
            ...data,
            langCode: data.langCode || '',
        };
        setState(currentState);
        dispatch(editTranslation());
        setOpen(true);
        setAnchorEl(null);
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
        <Box sx={{ width: '100%', mb: 3 }}>
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
                                    {details?.translations?.map(({ langCode }, index) => (
                                        <Tab
                                            key={index}
                                            label={langs[langCode]?.name || langCode}
                                            sx={{ textAlign: 'left', alignItems: 'flex-start' }}
                                        />
                                    ))}
                                </Tabs>
                            </Box>
                            <Box sx={{ flex: 1, position: 'relative' }}>
                                {details?.translations?.map((trans, index) => (
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
                                                                    dispatch(deleteNewsTranslation(trans.id));
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
                                                <Box component="div" sx={{ '& p': { mb: 1 }, '& p:last-child': { mb: 0 } }}>
                                                    {HTMLReactParser(trans.description || '')}
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>

            <NewsForm
                open={open}
                onClose={closeModal}
                addTranslationModal={isTranslation}
                editModal={isModalEdit}
                form={state.form}
                onInputChange={onInputChange}
                updateNews={(id) => {
                    dispatch(updateNewsTranslation({ id: id || state.form.fields.id, data: state.form.fields }));
                }}
                saveNews={() => {
                    dispatch(saveNewsTranslation({ id: details.id, data: state.form.fields }));
                }}
                currentLangs={isTranslation ? details?.translations?.map(({ langCode }) => langCode) : undefined}
            />
        </Box>
    );
}
