import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Box, Chip, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVert as MoreVertIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, Campaign as CampaignIcon } from '@mui/icons-material';
import { baseUrl } from '../../../services/ApiService';
import { getImageName } from '../../../utils/externals.util';
import { publicImageSlide } from '../store/ImageSlider.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ImageSlider(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteImage = (id) => {
        props.deleteImage(id);
        handleClose();
    };

    const publishImage = (id, status) => {
        dispatch(publicImageSlide({ id, status }));
        handleClose();
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/admin/image-slides/${props.image.id}`)}>
                <Chip
                    label={props.image.translations.map((trans, index) => `${trans.langCode}${index + 1 !== props.image.translations.length ? ' | ' : ''}`).join('')}
                    color="warning"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                    }}
                />
                <CardMedia
                    component="img"
                    height="200"
                    image={baseUrl() + '/images' + getImageName(props.image.filePath)}
                    alt={props.image.title}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5 }}>
                <Chip
                    label={props.image.isPublished.status ? 'Published' : 'Not published'}
                    color={props.image.isPublished.status ? 'success' : 'error'}
                    size="small"
                />
                <IconButton size="small" onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem
                        onClick={() => {
                            navigate(`/admin/image-slides/${props.image.id}`);
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>View</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => publishImage(props.image.id, !props.image.isPublished.status)}>
                        <ListItemIcon>
                            <CampaignIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>{props.image.isPublished.status ? 'Unpublish' : 'Publish'}</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => deleteImage(props.image.id)}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    );
}
