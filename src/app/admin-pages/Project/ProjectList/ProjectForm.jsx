import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    CircularProgress,
    IconButton,
    TextField,
    Autocomplete,
    FormHelperText,
    Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Editor from '../../../components/Form/Editor';
import { useSelector } from 'react-redux';

const languages = [
    { code: 'fr', name: 'French' },
    { code: 'en', name: 'English' },
];

export default function ProjectForm(props) {
    const { isSaving } = useSelector((state) => state.project);

    const handleLanguageChange = (event, newValue) => {
        const value = newValue ? newValue.code : '';
        props.onInputChange({ name: 'langCode', value, error: '' });
    };

    const handleTitleChange = (event) => {
        const value = event.target.value;
        const error = value ? '' : 'Title is required';
        props.onInputChange({ name: 'title', value, error });
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        props.onInputChange({ name: 'description', value, error: '' });
    };

    const selectedLanguage = languages.find((lang) => lang.code === props.form.fields.langCode) || null;
    const availableLanguages = props.currentLangs
        ? languages.filter((lang) => !props.currentLangs.includes(lang.code))
        : languages;

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <span>
                        {props.editModal ? 'Edit Translation' : props.addTranslationModal ? 'Add Translation' : 'New Project'}
                    </span>
                    <IconButton edge="end" color="inherit" onClick={props.onClose} aria-label="close" size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Autocomplete
                        options={availableLanguages}
                        getOptionLabel={(option) => option.name}
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        disabled={props.editModal}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Language" fullWidth />}
                    />
                    <TextField
                        name="title"
                        label="Title"
                        value={props.form.fields.title}
                        onChange={handleTitleChange}
                        error={!!props.form.errors.title}
                        helperText={props.form.errors.title}
                        fullWidth
                    />
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Description
                        </Typography>
                        <Editor
                            name="description"
                            value={props.form.fields.description}
                            id={`editor${new Date().getTime()}`}
                            config={{
                                plugins: ['code'],
                            }}
                            onChange={handleDescriptionChange}
                        />
                        {props.form.errors.description && (
                            <FormHelperText error sx={{ mt: 0.5 }}>
                                {props.form.errors.description}
                            </FormHelperText>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={props.onClose} color="error">
                    Close
                </Button>
                {props.editModal ? (
                    <Button
                        onClick={() => props.updateProject(props.form.fields.id)}
                        variant="contained"
                        disabled={isSaving}
                        sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                    >
                        {isSaving ? <CircularProgress size={20} /> : 'Update'}
                    </Button>
                ) : (
                    <Button
                        onClick={props.saveProject}
                        variant="contained"
                        disabled={isSaving}
                        sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                    >
                        {isSaving ? <CircularProgress size={20} /> : 'Save'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
