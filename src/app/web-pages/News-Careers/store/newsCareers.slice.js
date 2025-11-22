import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCareers, getNews } from '../../website.service';
const initialState = {
    careers: [],
    blogNews: [],
};

export const loadCareers = createAsyncThunk('webProject/loadCareers', async (params) => {
    return await getCareers(params);
});

export const loadNews = createAsyncThunk('webProject/loadNews', async (params) => {
    return await getNews(params);
});

const webCareers = createSlice({
    name: 'webCareers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCareers.fulfilled, (state, action) => {
                state.careers = action.payload;
            })
            .addCase(loadCareers.rejected, (state) => {
                state.careers = [];
            })
            .addCase(loadNews.fulfilled, (state, action) => {
                state.blogNews = action.payload;
            })
            .addCase(loadNews.rejected, (state) => {
                state.blogNews = [];
            });
    },
});

export default webCareers.reducer;
