import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
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

export const saveNews = createAsyncThunk('news/saveNews', async (data, { rejectWithValue }) => {
    try {
        await saveNewsApi(data);
        toast.success('News article saved successfully!');
        return await getNewsApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to save news article');
        return rejectWithValue(error);
    }
});

export const publicNews = createAsyncThunk('news/publicNews', async ({ id, status }) => {
    try {
        await publishNewsApi(id, status);
        toast.success(`News article ${status ? 'published' : 'unpublished'} successfully!`);
        return await getNewsApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to update publish status');
        throw error;
    }
});

export const deleteNews = createAsyncThunk('news/deleteNews', async (id) => {
    try {
        await deleteNewsApi(id);
        toast.success('News article deleted successfully!');
        return await getNewsApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete news article');
        throw error;
    }
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
    extraReducers: (builder) => {
        builder
            .addCase(loadNews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.news = action.payload;
            })
            .addCase(loadNews.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveNews.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(saveNews.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isModalOpen = false;
                state.news = action.payload;
            })
            .addCase(saveNews.rejected, (state) => {
                state.isSaving = false;
            })
            .addCase(publicNews.fulfilled, (state, action) => {
                state.news = action.payload;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.news = action.payload;
            });
    },
});

export const { closeOpenModal, newNews } = newsSlice.actions;
export default newsSlice.reducer;
