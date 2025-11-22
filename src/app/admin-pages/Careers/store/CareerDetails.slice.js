import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { getCareerDetailsApi, updateCareerApi } from '../service/Career.service';

const initialState = {
    details: {},
    isSaving: false,
    isLoading: false,
    isModalOpen: false,
    isModalEdit: false,
};

export const loadCareerDetails = createAsyncThunk('careerDetails/loadCareerDetails', async ({ id }) => {
    return await getCareerDetailsApi(id);
});

export const updateCareerDetails = createAsyncThunk('careerDetails/updateCareerDetails', async ({ id, data }, thunkAPI) => {
    try {
        await updateCareerApi(id, data);
        toast.success('Career updated successfully!');
        return await getCareerDetailsApi(thunkAPI.getState().careerDetails.details.id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to update career');
        throw error;
    }
});

const careerDetailSlice = createSlice({
    name: 'careerDetails',
    initialState,
    reducers: {
        editCareerDetails: (state) => {
            state.isModalOpen = true;
            state.isModalEdit = true;
        },
        closeOpenModal: (state) => {
            state.isModalOpen = false;
            state.isModalEdit = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCareerDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadCareerDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.details = action.payload;
            })
            .addCase(loadCareerDetails.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateCareerDetails.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(updateCareerDetails.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isModalOpen = false;
                state.details = action.payload;
            })
            .addCase(updateCareerDetails.rejected, (state) => {
                state.isSaving = false;
            });
    },
});

export const { closeOpenModal, editCareerDetails } = careerDetailSlice.actions;
export default careerDetailSlice.reducer;
