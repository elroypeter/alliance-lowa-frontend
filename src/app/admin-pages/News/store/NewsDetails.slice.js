import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNewsDetailsApi, addNewsTranslationApi, deleteNewsTranslationApi, updateNewsTranslationApi } from '../service/News.service';

const initialState = {
    details: {},
    isSaving: false,
    isLoading: false,
    isModalOpen: false,
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
        newAttachmentModal: (state) => {
            state.isModalOpen = true;
        },
        newTranslation: (state) => {
            state.isModalOpen = true;
            state.isTranslation = true;
        },
        editTranslation: (state) => {
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
        [loadNewsDetails.pending]: (state) => {
            state.isLoading = true;
        },
        [loadNewsDetails.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.details = action.payload;
        },
        [loadNewsDetails.rejected]: (state) => {
            state.isLoading = false;
        },
        [saveNewsTranslation.pending]: (state) => {
            state.isSaving = true;
        },
        [saveNewsTranslation.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.details = action.payload;
        },
        [saveNewsTranslation.rejected]: (state) => {
            state.isSaving = false;
        },
        [deleteNewsTranslation.fulfilled]: (state, action) => {
            state.details = action.payload;
        },
        [updateNewsTranslation.pending]: (state) => {
            state.isSaving = true;
        },
        [updateNewsTranslation.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.details = action.payload;
        },
        [updateNewsTranslation.rejected]: (state) => {
            state.isSaving = false;
        },
    },
});

export const { closeOpenModal, newAttachmentModal, newTranslation, editTranslation } = newsDetailSlice.actions;
export default newsDetailSlice.reducer;
