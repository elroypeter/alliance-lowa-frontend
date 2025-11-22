import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
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

export const saveCareer = createAsyncThunk('career/saveCareer', async (data, { rejectWithValue }) => {
    try {
        await saveCareerApi(data);
        toast.success('Career saved successfully!');
        return await getCareerApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to save career');
        return rejectWithValue(error);
    }
});

export const publishCareer = createAsyncThunk('career/publishCareer', async ({ id, status }) => {
    try {
        await publishCareerApi(id, status);
        toast.success(`Career ${status ? 'published' : 'unpublished'} successfully!`);
        return await getCareerApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to update publish status');
        throw error;
    }
});

export const deleteCareer = createAsyncThunk('career/deleteCareer', async (id) => {
    try {
        await deleteCareerApi(id);
        toast.success('Career deleted successfully!');
        return await getCareerApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete career');
        throw error;
    }
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
    extraReducers: (builder) => {
        builder
            .addCase(loadCareers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadCareers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.careers = action.payload;
            })
            .addCase(loadCareers.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveCareer.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(saveCareer.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isModalOpen = false;
                state.careers = action.payload;
            })
            .addCase(saveCareer.rejected, (state) => {
                state.isSaving = false;
            })
            .addCase(publishCareer.fulfilled, (state, action) => {
                state.careers = action.payload;
            })
            .addCase(deleteCareer.fulfilled, (state, action) => {
                state.careers = action.payload;
            });
    },
});

export const { closeOpenModal, newCareer } = careerSlice.actions;
export default careerSlice.reducer;
