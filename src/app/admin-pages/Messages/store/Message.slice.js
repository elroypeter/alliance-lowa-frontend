import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { getMessageApi, deleteMessageApi } from '../service/Message.service';

const initialState = {
    messages: [],
    isLoading: false,
};

export const loadMessages = createAsyncThunk('message/loadMessages', async () => {
    return await getMessageApi();
});

export const deleteMessage = createAsyncThunk('message/deleteMessage', async (id) => {
    try {
        await deleteMessageApi(id);
        toast.success('Message deleted successfully!');
        return await getMessageApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete message');
        throw error;
    }
});

const MessageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload;
            })
            .addCase(loadMessages.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.messages = action.payload;
            });
    },
});

export default MessageSlice.reducer;
