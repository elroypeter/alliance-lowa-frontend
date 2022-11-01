import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMessageDetailsApi } from '../service/Message.service';

const initialState = {
    details: {},
    isLoading: false,
};

export const loadMessagesDetails = createAsyncThunk('messageDetails/loadMessagesDetails', async (id) => {
    return await getMessageDetailsApi(id);
});

const MessageDetailSlice = createSlice({
    name: 'messageDetails',
    initialState,
    reducers: {},
    extraReducers: {
        [loadMessagesDetails.pending]: (state) => {
            state.isLoading = true;
        },
        [loadMessagesDetails.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.details = action.payload;
        },
        [loadMessagesDetails.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export default MessageDetailSlice.reducer;
