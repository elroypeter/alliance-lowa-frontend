import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSingleImageSlider, addImageTranslation, deleteTranslation, updateImageTranslation } from '../service/ImageSlider.service';

const initialState = {
    imageSliderDetails: {},
    isLoading: false,
    isSaving: false,
    isModalOpen: false,
    isTranslation: false,
    isModelEdit: false,
};

export const loadImageSlideDetails = createAsyncThunk('imageSliderDetails/loadImageSlideDetails', async (id) => {
    return await getSingleImageSlider(id);
});

export const saveImageTranslation = createAsyncThunk('imageSliderDetails/saveImageTranslation', async ({ id, data }) => {
    await addImageTranslation(id, data);
    return await getSingleImageSlider(id);
});

export const updateTranslation = createAsyncThunk('imageSliderDetails/updateTranslation', async ({ id, data }, thunkAPI) => {
    await updateImageTranslation(id, data);
    return await getSingleImageSlider(thunkAPI.getState().imageSliderDetails.imageSliderDetails.id);
});

export const deleteImageTranslation = createAsyncThunk('imageSliderDetails/deleteImageTranslation', async (id, thunkAPI) => {
    await deleteTranslation(id);
    return await getSingleImageSlider(thunkAPI.getState().imageSliderDetails.imageSliderDetails.id);
});

const imageSliderDetailSlice = createSlice({
    name: 'imageSliderDetails',
    initialState,
    reducers: {
        newTranslation: (state) => {
            state.isModalOpen = true;
            state.isTranslation = true;
        },
        editTranslation: (state) => {
            state.isModalOpen = true;
            state.isModelEdit = true;
        },
        closeOpenModal: (state) => {
            state.isModalOpen = false;
            state.isTranslation = false;
            state.isModelEdit = false;
        },
    },
    extraReducers: {
        [loadImageSlideDetails.pending]: (state) => {
            state.isLoading = true;
        },
        [loadImageSlideDetails.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.imageSliderDetails = action.payload;
        },
        [loadImageSlideDetails.rejected]: (state) => {
            state.isLoading = false;
        },
        [saveImageTranslation.pending]: (state) => {
            state.isSaving = true;
        },
        [saveImageTranslation.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.imageSliderDetails = action.payload;
        },
        [saveImageTranslation.rejected]: (state) => {
            state.isSaving = false;
        },
        [deleteImageTranslation.fulfilled]: (state, action) => {
            state.imageSliderDetails = action.payload;
        },
        [updateTranslation.pending]: (state) => {
            state.isSaving = true;
        },
        [updateTranslation.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.imageSliderDetails = action.payload;
        },
        [updateTranslation.rejected]: (state) => {
            state.isSaving = false;
        },
    },
});

export const { newTranslation, closeOpenModal, editTranslation } = imageSliderDetailSlice.actions;
export default imageSliderDetailSlice.reducer;
