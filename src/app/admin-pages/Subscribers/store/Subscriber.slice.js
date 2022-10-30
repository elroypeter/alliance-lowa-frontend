import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSubscribersApi, deleteSubscriberApi } from '../service/Subscriber.service';

const initialState = {
    subscribers: [],
    isLoading: false,
};

export const loadSubcribers = createAsyncThunk('subscriber/loadSubcribers', async () => {
    return await getSubscribersApi();
});

export const deleteSubcribers = createAsyncThunk('subscriber/deleteSubcribers', async (id) => {
    await deleteSubscriberApi(id);
    return await getSubscribersApi();
});

const SubscriberSlice = createSlice({
    name: 'subscriber',
    initialState,
    reducers: {},
    extraReducers: {
        [loadSubcribers.pending]: (state) => {
            state.isLoading = true;
        },
        [loadSubcribers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.subscribers = action.payload;
        },
        [loadSubcribers.rejected]: (state) => {
            state.isLoading = false;
        },
        [deleteSubcribers.fulfilled]: (state, action) => {
            state.subscribers = action.payload;
        },
    },
});

export default SubscriberSlice.reducer;
