import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getImageSlider } from '../../website.service';
const initialState = {
    sliders: [],
};

export const loadSliders = createAsyncThunk('homeSlider/loadSliders', async (params) => {
    return await getImageSlider(params);
});

const homeSlider = createSlice({
    name: 'homeSlider',
    initialState,
    reducers: {},
    extraReducers: {
        [loadSliders.fulfilled]: (state, action) => {
            state.sliders = action.payload;
        },
        [loadSliders.rejected]: (state) => {
            state.sliders = [];
        },
    },
});

export default homeSlider.reducer;
