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
    extraReducers: {
        [loadCareers.fulfilled]: (state, action) => {
            state.careers = action.payload;
        },
        [loadCareers.rejected]: (state) => {
            state.careers = [];
        },
        [loadNews.fulfilled]: (state, action) => {
            state.blogNews = action.payload;
        },
        [loadNews.rejected]: (state) => {
            state.blogNews = [];
        },
    },
});

export default webCareers.reducer;
