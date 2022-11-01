import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCareerApi, saveCareerApi, publishCareerApi, deleteCareerApi } from '../service/Career.service';

const initialState = {
    careers: [],
    isSaving: false,
    isLoading: false,
    isModalOpen: false,
};

export const loadCareers = createAsyncThunk('career/loadCareers', async () => {
    return await getCareerApi();
});

export const saveCareer = createAsyncThunk('career/saveCareer', async (data) => {
    await saveCareerApi(data);
    return await getCareerApi();
});

export const publishCareer = createAsyncThunk('career/publishCareer', async ({ id, status }) => {
    await publishCareerApi(id, status);
    return await getCareerApi();
});

export const deleteCareer = createAsyncThunk('career/deleteCareer', async (id) => {
    await deleteCareerApi(id);
    return await getCareerApi();
});

const careerSlice = createSlice({
    name: 'career',
    initialState,
    reducers: {
        newCareer: (state) => {
            state.isModalOpen = true;
        },
        closeOpenModal: (state) => {
            state.isModalOpen = false;
        },
    },
    extraReducers: {
        [loadCareers.pending]: (state) => {
            state.isLoading = true;
        },
        [loadCareers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.careers = action.payload;
        },
        [loadCareers.rejected]: (state) => {
            state.isLoading = false;
        },
        [saveCareer.pending]: (state) => {
            state.isSaving = true;
        },
        [saveCareer.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.careers = action.payload;
        },
        [saveCareer.rejected]: (state) => {
            state.isSaving = false;
        },
        [publishCareer.fulfilled]: (state, action) => {
            state.careers = action.payload;
        },
        [deleteCareer.fulfilled]: (state, action) => {
            state.careers = action.payload;
        },
    },
});

export const { closeOpenModal, newCareer } = careerSlice.actions;
export default careerSlice.reducer;
