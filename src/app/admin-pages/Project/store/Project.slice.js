import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { getProjectsApi, saveProjectApi, publishProjectApi, deleteProjectApi } from '../service/Project.service';

const initialState = {
    projects: [],
    isSaving: false,
    isLoading: false,
    isModalOpen: false,
};

export const loadProjects = createAsyncThunk('project/loadProjects', async () => {
    return await getProjectsApi();
});

export const saveProject = createAsyncThunk('project/saveProject', async (data, { rejectWithValue }) => {
    try {
        await saveProjectApi(data);
        toast.success('Project saved successfully!');
        return await getProjectsApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to save project');
        return rejectWithValue(error);
    }
});

export const publicProject = createAsyncThunk('project/publicProject', async ({ id, status }) => {
    try {
        await publishProjectApi(id, status);
        toast.success(`Project ${status ? 'published' : 'unpublished'} successfully!`);
        return await getProjectsApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to update publish status');
        throw error;
    }
});

export const deleteProject = createAsyncThunk('project/deleteProject', async (id) => {
    try {
        await deleteProjectApi(id);
        toast.success('Project deleted successfully!');
        return await getProjectsApi();
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete project');
        throw error;
    }
});

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        newProject: (state) => {
            state.isModalOpen = true;
        },
        closeOpenModal: (state) => {
            state.isModalOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload;
            })
            .addCase(loadProjects.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveProject.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(saveProject.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isModalOpen = false;
                state.projects = action.payload;
            })
            .addCase(saveProject.rejected, (state) => {
                state.isSaving = false;
            })
            .addCase(publicProject.fulfilled, (state, action) => {
                state.projects = action.payload;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projects = action.payload;
            });
    },
});

export const { closeOpenModal, newProject } = projectSlice.actions;
export default projectSlice.reducer;
