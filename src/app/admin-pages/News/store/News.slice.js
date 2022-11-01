import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNewsApi, saveNewsApi, publishNewsApi, deleteNewsApi } from '../service/News.service';

const initialState = {
    news: [],
    isSaving: false,
    isLoading: false,
    isModalOpen: false,
};

export const loadNews = createAsyncThunk('news/loadNews', async () => {
    return await getNewsApi();
});

export const saveNews = createAsyncThunk('news/saveNews', async (data) => {
    await saveNewsApi(data);
    return await getNewsApi();
});

export const publicNews = createAsyncThunk('news/publicNews', async ({ id, status }) => {
    await publishNewsApi(id, status);
    return await getNewsApi();
});

export const deleteNews = createAsyncThunk('news/deleteNews', async (id) => {
    await deleteNewsApi(id);
    return await getNewsApi();
});

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        newNews: (state) => {
            state.isModalOpen = true;
        },
        closeOpenModal: (state) => {
            state.isModalOpen = false;
        },
    },
    extraReducers: {
        [loadNews.pending]: (state) => {
            state.isLoading = true;
        },
        [loadNews.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.news = action.payload;
        },
        [loadNews.rejected]: (state) => {
            state.isLoading = false;
        },
        [saveNews.pending]: (state) => {
            state.isSaving = true;
        },
        [saveNews.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.news = action.payload;
        },
        [saveNews.rejected]: (state) => {
            state.isSaving = false;
        },
        [publicNews.fulfilled]: (state, action) => {
            state.news = action.payload;
        },
        [deleteNews.fulfilled]: (state, action) => {
            state.news = action.payload;
        },
    },
});

export const { closeOpenModal, newNews } = newsSlice.actions;
export default newsSlice.reducer;
