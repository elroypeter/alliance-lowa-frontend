import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
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

export const saveImageSlides = createAsyncThunk('imageSlider/saveImageSlides', async (data, { rejectWithValue }) => {
    try {
        const result = await saveImageSlider(data);
        toast.success('Image slide saved successfully!');
        return result;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to save image slide');
        return rejectWithValue(error);
    }
});

export const publicImageSlide = createAsyncThunk('imageSlider/publicImageSlide', async ({ id, status }, thunkAPI) => {
    try {
        await publishImageSlider(id, status);
        toast.success(`Image slide ${status ? 'published' : 'unpublished'} successfully!`);
        return await getImageSlider(thunkAPI.getState().imageSlider.selectedLanguage);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to update publish status');
        throw error;
    }
});

export const deleteImageSlide = createAsyncThunk('imageSlider/deleteImageSlide', async (id, thunkAPI) => {
    try {
        await deleteImageSlider(id);
        toast.success('Image slide deleted successfully!');
        return await getImageSlider(thunkAPI.getState().imageSlider.selectedLanguage);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete image slide');
        throw error;
    }
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
