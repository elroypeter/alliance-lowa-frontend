import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
    getNewsDetailsApi,
    addNewsTranslationApi,
    deleteNewsTranslationApi,
    updateNewsTranslationApi,
    updateNewsCoverApi,
} from '../service/News.service';

const initialState = {
    details: {},
    isSaving: false,
    isLoading: false,
    isTranslationModalOpen: false,
    isModalEdit: false,
    isTranslation: false,
};

export const loadNewsDetails = createAsyncThunk('newsDetails/loadNewsDetails', async ({ id }) => {
    return await getNewsDetailsApi(id);
});

export const saveNewsTranslation = createAsyncThunk('newsDetails/saveNewsTranslation', async ({ id, data }, { rejectWithValue }) => {
    try {
        await addNewsTranslationApi(id, data);
        toast.success('Translation added successfully!');
        return await getNewsDetailsApi(id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to add translation');
        return rejectWithValue(error);
    }
});

export const deleteNewsTranslation = createAsyncThunk('newsDetails/deleteNewsTranslation', async (id, thunkAPI) => {
    try {
        await deleteNewsTranslationApi(id);
        toast.success('Translation deleted successfully!');
        return await getNewsDetailsApi(thunkAPI.getState().newsDetails.details.id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete translation');
        throw error;
    }
});

export const updateNewsTranslation = createAsyncThunk('newsDetails/updateNewsTranslation', async ({ id, data }, thunkAPI) => {
    try {
        await updateNewsTranslationApi(id, data);
        toast.success('Translation updated successfully!');
        return await getNewsDetailsApi(thunkAPI.getState().newsDetails.details.id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to update translation');
        throw error;
    }
});

export const updateNewsCover = createAsyncThunk('newsDetails/updateNewsCover', async ({ id, base64 }, { rejectWithValue }) => {
    try {
        await updateNewsCoverApi(id, { base64 });
        toast.success('Cover image updated successfully!');
        return await getNewsDetailsApi(id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to update cover image');
        return rejectWithValue(error);
    }
});

const newsDetailSlice = createSlice({
    name: 'newsDetails',
    initialState,
    reducers: {
        newTranslation: (state) => {
            state.isTranslationModalOpen = true;
            state.isTranslation = true;
            state.isModalEdit = false;
        },
        editTranslation: (state) => {
            state.isTranslationModalOpen = true;
            state.isModalEdit = true;
        },
        closeOpenModal: (state) => {
            state.isTranslationModalOpen = false;
            state.isModalEdit = false;
            state.isTranslation = false;
        },
        closeTranslationModal: (state) => {
            state.isTranslationModalOpen = false;
            state.isModalEdit = false;
            state.isTranslation = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadNewsDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadNewsDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.details = action.payload;
            })
            .addCase(loadNewsDetails.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveNewsTranslation.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(saveNewsTranslation.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isTranslationModalOpen = false;
                state.details = action.payload;
            })
            .addCase(saveNewsTranslation.rejected, (state) => {
                state.isSaving = false;
            })
            .addCase(deleteNewsTranslation.fulfilled, (state, action) => {
                state.details = action.payload;
            })
            .addCase(updateNewsTranslation.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(updateNewsTranslation.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isTranslationModalOpen = false;
                state.details = action.payload;
            })
            .addCase(updateNewsTranslation.rejected, (state) => {
                state.isSaving = false;
            })
            .addCase(updateNewsCover.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(updateNewsCover.fulfilled, (state, action) => {
                state.isSaving = false;
                state.details = action.payload;
            })
            .addCase(updateNewsCover.rejected, (state) => {
                state.isSaving = false;
            });
    },
});

export const { closeOpenModal, closeTranslationModal, newTranslation, editTranslation } = newsDetailSlice.actions;
export default newsDetailSlice.reducer;
