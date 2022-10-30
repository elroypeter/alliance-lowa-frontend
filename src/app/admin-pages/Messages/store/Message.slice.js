import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMessageApi, deleteMessageApi } from '../service/Message.service';

const initialState = {
    messages: [],
    isLoading: false,
};

export const loadMessages = createAsyncThunk('message/loadMessages', async () => {
    return await getMessageApi();
});

export const deleteMessage = createAsyncThunk('message/deleteMessage', async (id) => {
    await deleteMessageApi(id);
    return await getMessageApi();
});

const MessageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: {
        [loadMessages.pending]: (state) => {
            state.isLoading = true;
        },
        [loadMessages.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.messages = action.payload;
        },
        [loadMessages.rejected]: (state) => {
            state.isLoading = false;
        },
        [deleteMessage.fulfilled]: (state, action) => {
            state.messages = action.payload;
        },
    },
});

export default MessageSlice.reducer;
