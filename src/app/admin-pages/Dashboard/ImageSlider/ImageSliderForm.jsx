import React, { useState, useRef } from 'react';
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
import ImageCropperInput from '../../../components/Form/ImageCropperInput';

const languages = [
    { code: 'fr', name: 'French' },
    { code: 'en', name: 'English' },
];

export default function ImageSliderForm(props) {
    const [imageError, setImageError] = useState('');
    const croppieRef = useRef(null);
    const croppieTargetRef = useRef(null);

    const handleLanguageChange = (event, newValue) => {
        const value = newValue ? newValue.code : '';
        const error = value ? '' : 'Language is required';
        props.onInputChange({ name: 'langCode', value, error });
    };

    const handleTitleChange = (event) => {
        const value = event.target.value;
        const error = value ? '' : 'Title is required';
        props.onInputChange({ name: 'title', value, error });
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        const error = value ? '' : 'Description is required';
        props.onInputChange({ name: 'description', value, error });
    };

    const handleImageChange = (evt, croppie, target) => {
        croppieRef.current = croppie;
        croppieTargetRef.current = target;

        const file = evt.target.files[0];
        if (!file) return;

        const originalType = file.type.split('/')[1];
        const validTypes = ['jpg', 'png', 'webp', 'jpeg'];

        if (!validTypes.includes(originalType)) {
            setImageError('Invalid file format');
            return;
        }

        setImageError('');
        const preview = URL.createObjectURL(file);
        croppie.bind({ url: preview });

        target.addEventListener('update', () => {
            croppie.result({ type: 'base64', format: originalType }).then((base64) => {
                props.onInputChange({ name: 'base64', value: base64, error: '' });
            });
        });
    };

    const selectedLanguage = languages.find((lang) => lang.code === props.form.fields.langCode) || null;
    const availableLanguages = props.exlang ? languages.filter((lang) => !props.exlang.includes(lang.code)) : languages;

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <span>{props.editModal ? 'Edit Translation' : props.addTranslationModal ? 'Add Translation' : 'New Image Slider'}</span>
                    <IconButton edge="end" color="inherit" onClick={props.onClose} aria-label="close" size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {props.editModal || props.addTranslationModal || (
                        <Box sx={{ width: '100%' }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                Image
                            </Typography>
                            <ImageCropperInput
                                id={`imageInput${new Date().getTime()}`}
                                label=""
                                config={{
                                    viewport: {
                                        width: 350,
                                        height: 250,
                                    },
                                }}
                                value={props.form.fields.base64}
                                onChange={handleImageChange}
                            />
                            {imageError && (
                                <FormHelperText error sx={{ mt: 0.5 }}>
                                    {imageError}
                                </FormHelperText>
                            )}
                        </Box>
                    )}
                    <Autocomplete
                        options={availableLanguages}
                        getOptionLabel={(option) => option.name}
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        disabled={props.editModal}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Language"
                                required
                                error={!!props.form.errors.langCode}
                                helperText={props.form.errors.langCode}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderWidth: '1px',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                    <TextField
                        name="title"
                        label="Title"
                        value={props.form.fields.title}
                        onChange={handleTitleChange}
                        error={!!props.form.errors.title}
                        helperText={props.form.errors.title}
                        required
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderWidth: '1px',
                                },
                            },
                        }}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={props.form.fields.description}
                        onChange={handleDescriptionChange}
                        error={!!props.form.errors.description}
                        helperText={props.form.errors.description}
                        required
                        multiline
                        rows={4}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderWidth: '1px',
                                },
                            },
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={props.onClose} color="error">
                    Close
                </Button>
                {props.editModal ? (
                    <Button
                        onClick={() => props.updateImage(props.form.fields.translation_id)}
                        variant="contained"
                        disabled={props.savingStatus}
                        sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                    >
                        {props.savingStatus ? <CircularProgress size={20} /> : 'Update'}
                    </Button>
                ) : (
                    <Button
                        onClick={props.saveImage}
                        variant="contained"
                        disabled={props.savingStatus || !props.form.fields.langCode || !props.form.fields.title || !props.form.fields.description}
                        sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                    >
                        {props.savingStatus ? <CircularProgress size={20} /> : 'Save'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
