import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNewsDetailsApi, addNewsTranslationApi, deleteNewsTranslationApi, updateNewsTranslationApi } from '../service/News.service';

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

export const saveNewsTranslation = createAsyncThunk('newsDetails/saveNewsTranslation', async ({ id, data }) => {
    await addNewsTranslationApi(id, data);
    return await getNewsDetailsApi(id);
});

export const deleteNewsTranslation = createAsyncThunk('newsDetails/deleteNewsTranslation', async (id, thunkAPI) => {
    await deleteNewsTranslationApi(id);
    return await getNewsDetailsApi(thunkAPI.getState().newsDetails.details.id);
});

export const updateNewsTranslation = createAsyncThunk('newsDetails/updateNewsTranslation', async ({ id, data }, thunkAPI) => {
    await updateNewsTranslationApi(id, data);
    return await getNewsDetailsApi(thunkAPI.getState().newsDetails.details.id);
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
            });
    },
});

export const { closeOpenModal, closeTranslationModal, newTranslation, editTranslation } = newsDetailSlice.actions;
export default newsDetailSlice.reducer;
