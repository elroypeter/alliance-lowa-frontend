import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProjects } from '../../website.service';
const initialState = {
    projects: [],
    activeProject: null,
};

export const loadProjects = createAsyncThunk('webProject/loadProjects', async (params) => {
    return await getProjects(params);
});

const webProject = createSlice({
    name: 'webProject',
    initialState,
    reducers: {
        setActiveProject: (state, action) => {
            state.activeProject = action.payload;
        },
    },
    extraReducers: {
        [loadProjects.fulfilled]: (state, action) => {
            state.projects = action.payload;
        },
        [loadProjects.rejected]: (state) => {
            state.projects = [];
        },
    },
});

export const { setActiveProject } = webProject.actions;
export default webProject.reducer;
