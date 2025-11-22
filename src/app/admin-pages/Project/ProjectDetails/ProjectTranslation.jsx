import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Card,
    CardContent,
    Button,
    Tabs,
    Tab,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import ProjectForm from '../ProjectList/ProjectForm';
import HTMLReactParser from 'html-react-parser';
import {
    saveProjectTranslation,
    newTranslation,
    editTranslation,
    deleteProjectTranslation,
    updateProjectTranslation,
    closeTranslationModal,
} from '../store/ProjectDetails.slice';

export default function ProjectTranslation() {
    const dispatch = useDispatch();
    const { langs } = useSelector((state) => state.language);
    const { details, isLoading, isTranslationModalOpen, isModalEdit, isTranslation } = useSelector((state) => state.projectDetails);
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTranslation, setSelectedTranslation] = useState(null);
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
                                                                    dispatch(deleteProjectTranslation(trans.id));
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

            <ProjectForm
                open={open}
                onClose={closeModal}
                addTranslationModal={isTranslation}
                editModal={isModalEdit}
                form={state.form}
                onInputChange={onInputChange}
                updateProject={(id) => {
                    dispatch(updateProjectTranslation({ id: id || state.form.fields.id, data: state.form.fields }));
                }}
                saveProject={() => {
                    dispatch(saveProjectTranslation({ id: details.id, data: state.form.fields }));
                }}
                currentLangs={isTranslation ? details?.translations?.map(({ langCode }) => langCode) : undefined}
            />
        </Box>
    );
}
