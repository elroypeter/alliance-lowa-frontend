import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const saveProject = createAsyncThunk('project/saveProject', async (data) => {
    await saveProjectApi(data);
    return await getProjectsApi();
});

export const publicProject = createAsyncThunk('project/publicProject', async ({ id, status }) => {
    await publishProjectApi(id, status);
    return await getProjectsApi();
});

export const deleteProject = createAsyncThunk('project/deleteProject', async (id) => {
    await deleteProjectApi(id);
    return await getProjectsApi();
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
    extraReducers: {
        [loadProjects.pending]: (state) => {
            state.isLoading = true;
        },
        [loadProjects.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.projects = action.payload;
        },
        [loadProjects.rejected]: (state) => {
            state.isLoading = false;
        },
        [saveProject.pending]: (state) => {
            state.isSaving = true;
        },
        [saveProject.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.projects = action.payload;
        },
        [saveProject.rejected]: (state) => {
            state.isSaving = false;
        },
        [publicProject.fulfilled]: (state, action) => {
            state.projects = action.payload;
        },
        [deleteProject.fulfilled]: (state, action) => {
            state.projects = action.payload;
        },
    },
});

export const { closeOpenModal, newProject } = projectSlice.actions;
export default projectSlice.reducer;
