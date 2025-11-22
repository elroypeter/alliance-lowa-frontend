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
    Typography,
    FormHelperText,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ImageCropperInput from '../../../components/Form/ImageCropperInput';
import { useSelector } from 'react-redux';

export default function ProjectNewImage(props) {
    const { isSaving } = useSelector((state) => state.projectDetails);
    const [imageError, setImageError] = useState('');
    const croppieRef = useRef(null);
    const croppieTargetRef = useRef(null);

    const handleImageChange = (evt, croppie, target) => {
        croppieRef.current = croppie;
        croppieTargetRef.current = target;

        const file = evt.target.files[0];
        if (!file) return;

        const originalType = file.type.split('/')[1];
        const validTypes = ['jpg', 'png', 'webp', 'jpeg'];

        if (!validTypes.includes(originalType)) {
            setImageError('Invalid file format. Please select a JPG, PNG, or WEBP image.');
            return;
        }

        setImageError('');
        const preview = URL.createObjectURL(file);
        croppie.bind({ url: preview });

        target.addEventListener('update', () => {
            croppie
                .result({
                    type: 'base64',
                    size: 'viewport',
                    format: originalType,
                    quality: 0.8,
                })
                .then((base64) => {
                    props.onInputChange({ name: 'base64', value: base64, error: '' });
                })
                .catch((error) => {
                    console.error('Error getting cropped image:', error);
                    setImageError('Failed to process image');
                });
        });
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <span>Add Attachment</span>
                    <IconButton edge="end" color="inherit" onClick={props.onClose} aria-label="close" size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Image
                        </Typography>
                        <ImageCropperInput
                            id={`attachmentInput${new Date().getTime()}`}
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
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={props.onClose} color="error">
                    Close
                </Button>
                <Button
                    onClick={props.saveImage}
                    variant="contained"
                    disabled={isSaving}
                    sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                >
                    {isSaving ? <CircularProgress size={20} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
