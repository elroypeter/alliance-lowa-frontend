import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { getSubscribersApi, deleteSubscriberApi } from '../service/Subscriber.service';

const initialState = {
    subscribers: [],
    isLoading: false,
};

export const loadSubcribers = createAsyncThunk('subscriber/loadSubcribers', async () => {
    return await getSubscribersApi();
});

export const deleteSubcribers = createAsyncThunk('subscriber/deleteSubcribers', async (id) => {
    try {
        await deleteSubscriberApi(id);
        toast.success('Subscriber deleted successfully!');
        return await getSubscribersApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete subscriber');
        throw error;
    }
});

const SubscriberSlice = createSlice({
    name: 'subscriber',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSubcribers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadSubcribers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subscribers = action.payload;
            })
            .addCase(loadSubcribers.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteSubcribers.fulfilled, (state, action) => {
                state.subscribers = action.payload;
            });
    },
});

export default SubscriberSlice.reducer;
