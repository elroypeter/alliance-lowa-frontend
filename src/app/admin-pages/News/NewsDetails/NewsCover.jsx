import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    CircularProgress,
    IconButton,
    Typography,
    FormHelperText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Close as CloseIcon, Image as ImageIcon } from '@mui/icons-material';
import ImageCropperInput from '../../../components/Form/ImageCropperInput';
import { updateNewsCover } from '../store/NewsDetails.slice';
import { baseUrl } from '../../../services/ApiService';
import { getImageName } from '../../../utils/externals.util';

export default function NewsCover() {
    const dispatch = useDispatch();
    const { details, isSaving } = useSelector((state) => state.newsDetails);
    const [open, setOpen] = useState(false);
    const [imageError, setImageError] = useState('');
    const [base64, setBase64] = useState('');
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
                .then((base64Result) => {
                    setBase64(base64Result);
                })
                .catch((error) => {
                    console.error('Error getting cropped image:', error);
                    setImageError('Failed to process image');
                });
        });
    };

    const handleSave = () => {
        if (!base64) {
            setImageError('Please select an image');
            return;
        }
        dispatch(updateNewsCover({ id: details.id, base64 }));
        setOpen(false);
        setBase64('');
        setImageError('');
    };

    const handleClose = () => {
        setOpen(false);
        setBase64('');
        setImageError('');
    };

    return (
        <>
            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Cover Image
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => setOpen(true)}
                            size="small"
                            sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                        >
                            Update Cover
                        </Button>
                    </Box>
                    {details.filePath ? (
                        <CardMedia
                            component="img"
                            image={baseUrl() + '/images' + getImageName(details.filePath)}
                            alt="Cover Image"
                            sx={{
                                width: '100%',
                                maxHeight: '400px',
                                objectFit: 'cover',
                                borderRadius: 2,
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                py: 8,
                                border: '2px dashed',
                                borderColor: 'divider',
                                borderRadius: 2,
                            }}
                        >
                            <ImageIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                                No cover image uploaded
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <span>Update Cover Image</span>
                        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" size="small">
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
                                id={`coverInput${new Date().getTime()}`}
                                label=""
                                config={{
                                    viewport: {
                                        width: 350,
                                        height: 250,
                                    },
                                }}
                                value={base64}
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
                    <Button onClick={handleClose} color="error">
                        Close
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        disabled={isSaving || !base64}
                        sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                    >
                        {isSaving ? <CircularProgress size={20} /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

