import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Typography,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import { loadCareerDetails, updateCareerDetails, closeOpenModal, editCareerDetails } from '../store/CareerDetails.slice';
import CareerForm from '../CareerList/CareerForm';
import HTMLReactParser from 'html-react-parser';
import PageHeader from '../../../layouts/admin/PageHeader/PageHeader';

export default function CareerDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, details, isModalOpen, isModalEdit } = useSelector((state) => state.careerDetails);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        form: {
            fields: {
                id: '',
                title: '',
                description: '',
            },
            errors: {},
        },
    });

    useEffect(() => {
        dispatch(loadCareerDetails({ id: params.id }));
    }, [dispatch, params.id]);

    // Sync modal state with Redux
    useEffect(() => {
        setOpen(isModalOpen);
    }, [isModalOpen]);

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
        dispatch(closeOpenModal());
    };

    const handleEdit = () => {
        const currentState = Object.assign({}, state);
        currentState.form.fields = {
            id: details.id,
            title: details.title,
            description: details.description,
        };
        setState(currentState);
        dispatch(editCareerDetails());
        setOpen(true);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <PageHeader
                title="Career Details"
                breadcrumbs={[
                    { label: 'Dashboard', onClick: () => {} },
                    { label: 'Pages', onClick: () => {} },
                    { label: 'Careers', onClick: () => navigate('/admin/careers') },
                    { label: 'Details' },
                ]}
                action={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/admin/careers')}
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
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                            size="small"
                            sx={{ backgroundColor: '#048049', '&:hover': { backgroundColor: '#036a3d' } }}
                        >
                            Edit
                        </Button>
                    </Box>
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
                                Title
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {details.title}
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                Description
                            </Typography>
                            <Box component="div" sx={{ '& p': { mb: 1 }, '& p:last-child': { mb: 0 } }}>
                                {HTMLReactParser(details.description || '')}
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>

            <CareerForm
                open={open}
                onClose={closeModal}
                editModal={isModalEdit}
                form={state.form}
                onInputChange={onInputChange}
                updateCareer={() => {
                    dispatch(updateCareerDetails({ id: state.form.fields.id, data: state.form.fields }));
                }}
            />
        </Box>
    );
}
