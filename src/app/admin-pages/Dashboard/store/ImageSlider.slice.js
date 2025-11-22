import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getImageSlider, saveImageSlider, publishImageSlider, deleteImageSlider } from '../service/ImageSlider.service';

const initialState = {
    images: [],
    selectedLanguage: 'fr',
    isLoading: false,
    isSaving: false,
    isModalOpen: false,
};

export const loadImageSlides = createAsyncThunk('imageSlider/loadImageSlides', async () => {
    return await getImageSlider();
});

export const saveImageSlides = createAsyncThunk('imageSlider/saveImageSlides', async (data) => {
    return await saveImageSlider(data);
});

export const publicImageSlide = createAsyncThunk('imageSlider/publicImageSlide', async ({ id, status }, thunkAPI) => {
    await publishImageSlider(id, status);
    return await getImageSlider(thunkAPI.getState().imageSlider.selectedLanguage);
});

export const deleteImageSlide = createAsyncThunk('imageSlider/deleteImageSlide', async (id, thunkAPI) => {
    await deleteImageSlider(id);
    return await getImageSlider(thunkAPI.getState().imageSlider.selectedLanguage);
});

const imageSliderSlice = createSlice({
    name: 'imageSlider',
    initialState,
    reducers: {
        newImageSlider: (state) => {
            state.isModalOpen = true;
        },
        closeOpenModal: (state) => {
            state.isModalOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadImageSlides.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadImageSlides.fulfilled, (state, action) => {
                state.isLoading = false;
                state.images = action.payload;
            })
            .addCase(loadImageSlides.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveImageSlides.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(saveImageSlides.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isModalOpen = false;
                state.images = action.payload;
            })
            .addCase(saveImageSlides.rejected, (state) => {
                state.isSaving = false;
            })
            .addCase(publicImageSlide.fulfilled, (state, action) => {
                state.images = action.payload;
            })
            .addCase(deleteImageSlide.fulfilled, (state, action) => {
                state.images = action.payload;
            });
    },
});

export const { newImageSlider, closeOpenModal } = imageSliderSlice.actions;
export default imageSliderSlice.reducer;
