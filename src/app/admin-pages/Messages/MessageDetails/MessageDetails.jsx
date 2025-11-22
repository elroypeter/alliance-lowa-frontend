import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Button, CircularProgress, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { loadMessagesDetails } from '../store/MessageDetails.slice';
import PageHeader from '../../../layouts/admin/PageHeader/PageHeader';

export default function MessageDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, details } = useSelector((state) => state.messageDetails);

    useEffect(() => {
        dispatch(loadMessagesDetails(params.id));
    }, [dispatch, params.id]);

    return (
        <Box sx={{ width: '100%' }}>
            <PageHeader
                title="Message Details"
                breadcrumbs={[
                    { label: 'Dashboard', onClick: () => {} },
                    { label: 'Pages', onClick: () => {} },
                    { label: 'Messages', onClick: () => navigate('/admin/messages') },
                    { label: 'Details' },
                ]}
                action={
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/admin/messages')}
                        size="small"
                        sx={{
                            borderColor: '#048049',
                            color: '#048049',
                            '&:hover': { borderColor: '#036a3d', backgroundColor: 'rgba(4, 128, 73, 0.04)' },
                        }}
                    >
                        Back
                    </Button>
                }
            />
            <Card sx={{ width: '100%', mb: 3 }}>
                <CardContent sx={{ pt: 3 }}>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                Name
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {details.name}
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                Email
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {details.email}
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                Mobile
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {details.mobile}
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                Message
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                {details.message}
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
