import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Add as AddIcon } from '@mui/icons-material';
import { loadNewsDetails, newTranslation } from '../store/NewsDetails.slice';
import NewsTranslation from './NewsTranslation';
import PageHeader from '../../../layouts/admin/PageHeader/PageHeader';

export default function NewsDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadNewsDetails({ id: params.id }));
    }, [dispatch, params.id]);

    const handleOpenAddTranslation = () => {
        dispatch(newTranslation());
    };

    return (
        <Box sx={{ width: '100%' }}>
            <PageHeader
                title="News Details"
                breadcrumbs={[
                    { label: 'Dashboard', onClick: () => {} },
                    { label: 'Pages', onClick: () => {} },
                    { label: 'Blog & News', onClick: () => navigate('/admin/news') },
                    { label: 'Details' },
                ]}
                action={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/admin/news')}
                            size="small"
                            sx={{
                                borderColor: '#048049',
                                color: '#048049',
                                '&:hover': { borderColor: '#036a3d', backgroundColor: 'rgba(4, 128, 73, 0.04)' },
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAddTranslation}
                            size="small"
                            sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                        >
                            Add Translation
                        </Button>
                    </Box>
                }
            />
            <NewsTranslation />
        </Box>
    );
}
