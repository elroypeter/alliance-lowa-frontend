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
    extraReducers: (builder) => {
        builder
            .addCase(loadImageSlideDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadImageSlideDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.imageSliderDetails = action.payload;
            })
            .addCase(loadImageSlideDetails.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveImageTranslation.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(saveImageTranslation.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isModalOpen = false;
                state.imageSliderDetails = action.payload;
            })
            .addCase(saveImageTranslation.rejected, (state) => {
                state.isSaving = false;
            })
            .addCase(deleteImageTranslation.fulfilled, (state, action) => {
                state.imageSliderDetails = action.payload;
            })
            .addCase(updateTranslation.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(updateTranslation.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isModalOpen = false;
                state.imageSliderDetails = action.payload;
            })
            .addCase(updateTranslation.rejected, (state) => {
                state.isSaving = false;
            });
    },
});

export const { newTranslation, closeOpenModal, editTranslation } = imageSliderDetailSlice.actions;
export default imageSliderDetailSlice.reducer;
