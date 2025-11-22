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
    isTranslationModalOpen: false,
    isAttachmentModalOpen: false,
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
            state.isAttachmentModalOpen = true;
            state.isTranslationModalOpen = false; // Close translation modal if open
        },
        newTranslation: (state) => {
            state.isTranslationModalOpen = true;
            state.isAttachmentModalOpen = false; // Close attachment modal if open
            state.isTranslation = true;
            state.isModalEdit = false;
        },
        editTranslation: (state) => {
            state.isTranslationModalOpen = true;
            state.isAttachmentModalOpen = false; // Close attachment modal if open
            state.isModalEdit = true;
        },
        closeOpenModal: (state) => {
            state.isTranslationModalOpen = false;
            state.isAttachmentModalOpen = false;
            state.isModalEdit = false;
            state.isTranslation = false;
        },
        closeAttachmentModal: (state) => {
            state.isAttachmentModalOpen = false;
        },
        closeTranslationModal: (state) => {
            state.isTranslationModalOpen = false;
            state.isModalEdit = false;
            state.isTranslation = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProjectDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadProjectDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.details = action.payload;
            })
            .addCase(loadProjectDetails.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveProjectAttachment.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(saveProjectAttachment.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isAttachmentModalOpen = false;
                state.details = action.payload;
            })
            .addCase(saveProjectAttachment.rejected, (state) => {
                state.isSaving = false;
            })
            .addCase(deleteProjectAttachment.fulfilled, (state, action) => {
                state.details = action.payload;
            })
            .addCase(saveProjectTranslation.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(saveProjectTranslation.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isTranslationModalOpen = false;
                state.details = action.payload;
            })
            .addCase(saveProjectTranslation.rejected, (state) => {
                state.isSaving = false;
            })
            .addCase(deleteProjectTranslation.fulfilled, (state, action) => {
                state.details = action.payload;
            })
            .addCase(updateProjectTranslation.pending, (state) => {
                state.isSaving = true;
            })
            .addCase(updateProjectTranslation.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isTranslationModalOpen = false;
                state.details = action.payload;
            })
            .addCase(updateProjectTranslation.rejected, (state) => {
                state.isSaving = false;
            });
    },
});

export const { closeOpenModal, closeAttachmentModal, closeTranslationModal, newAttachmentModal, newTranslation, editTranslation } = projectDetailSlice.actions;
export default projectDetailSlice.reducer;
