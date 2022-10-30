import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    await updateCareerApi(id, data);
    return await getCareerDetailsApi(thunkAPI.getState().careerDetails.details.id);
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
            state.isTranslation = false;
        },
    },
    extraReducers: {
        [loadCareerDetails.pending]: (state) => {
            state.isLoading = true;
        },
        [loadCareerDetails.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.details = action.payload;
        },
        [loadCareerDetails.rejected]: (state) => {
            state.isLoading = false;
        },
        [updateCareerDetails.pending]: (state) => {
            state.isSaving = true;
        },
        [updateCareerDetails.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.details = action.payload;
        },
        [updateCareerDetails.rejected]: (state) => {
            state.isSaving = false;
        },
    },
});

export const { closeOpenModal, editCareerDetails } = careerDetailSlice.actions;
export default careerDetailSlice.reducer;
