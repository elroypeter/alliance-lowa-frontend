import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getProjectDetailsApi,
    addProjectAttachmentApi,
    removeProjectAttachmentApi,
    addProjectTranslationApi,
    deleteProjectTranslationApi,
    updateProjectTranslationApi,
} from '../service/Project.service';

const initialState = {
    details: {},
    isSaving: false,
    isLoading: false,
    isModalOpen: false,
    isModalEdit: false,
    isTranslation: false,
};

export const loadProjectDetails = createAsyncThunk('projectDetails/loadProjectDetails', async ({ id }) => {
    return await getProjectDetailsApi(id);
});

export const saveProjectAttachment = createAsyncThunk('projectDetails/saveProjectAttachment', async ({ id, data }) => {
    await addProjectAttachmentApi(id, data);
    return await getProjectDetailsApi(id);
});

export const deleteProjectAttachment = createAsyncThunk('projectDetails/deleteProjectAttachment', async (id, thunkAPI) => {
    await removeProjectAttachmentApi(id);
    return await getProjectDetailsApi(thunkAPI.getState().projectDetails.details.id);
});

export const saveProjectTranslation = createAsyncThunk('projectDetails/saveProjectTranslation', async ({ id, data }) => {
    await addProjectTranslationApi(id, data);
    return await getProjectDetailsApi(id);
});

export const deleteProjectTranslation = createAsyncThunk('projectDetails/deleteProjectTranslation', async (id, thunkAPI) => {
    await deleteProjectTranslationApi(id);
    return await getProjectDetailsApi(thunkAPI.getState().projectDetails.details.id);
});

export const updateProjectTranslation = createAsyncThunk('projectDetails/updateProjectTranslation', async ({ id, data }, thunkAPI) => {
    await updateProjectTranslationApi(id, data);
    return await getProjectDetailsApi(thunkAPI.getState().projectDetails.details.id);
});

const projectDetailSlice = createSlice({
    name: 'projectDetails',
    initialState,
    reducers: {
        newAttachmentModal: (state) => {
            state.isModalOpen = true;
        },
        newTranslation: (state) => {
            state.isModalOpen = true;
            state.isTranslation = true;
        },
        editTranslation: (state) => {
            state.isModalOpen = true;
            state.isModalEdit = true;
        },
        closeOpenModal: (state) => {
            state.isModalOpen = false;
            state.isModalEdit = false;
            state.isTranslation = false;
        },
    },
    extraReducers: {
        [loadProjectDetails.pending]: (state) => {
            state.isLoading = true;
        },
        [loadProjectDetails.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.details = action.payload;
        },
        [loadProjectDetails.rejected]: (state) => {
            state.isLoading = false;
        },
        [saveProjectAttachment.pending]: (state) => {
            state.isSaving = true;
        },
        [saveProjectAttachment.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.details = action.payload;
        },
        [saveProjectAttachment.rejected]: (state) => {
            state.isSaving = false;
        },
        [deleteProjectAttachment.fulfilled]: (state, action) => {
            state.details = action.payload;
        },
        [saveProjectTranslation.pending]: (state) => {
            state.isSaving = true;
        },
        [saveProjectTranslation.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.details = action.payload;
        },
        [saveProjectTranslation.rejected]: (state) => {
            state.isSaving = false;
        },
        [deleteProjectTranslation.fulfilled]: (state, action) => {
            state.details = action.payload;
        },
        [updateProjectTranslation.pending]: (state) => {
            state.isSaving = true;
        },
        [updateProjectTranslation.fulfilled]: (state, action) => {
            state.isSaving = false;
            state.isModalOpen = false;
            state.details = action.payload;
        },
        [updateProjectTranslation.rejected]: (state) => {
            state.isSaving = false;
        },
    },
});

export const { closeOpenModal, newAttachmentModal, newTranslation, editTranslation } = projectDetailSlice.actions;
export default projectDetailSlice.reducer;
