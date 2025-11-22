import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
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

export const saveProjectAttachment = createAsyncThunk('projectDetails/saveProjectAttachment', async ({ id, data }, { rejectWithValue }) => {
    try {
        await addProjectAttachmentApi(id, data);
        toast.success('Attachment added successfully!');
        return await getProjectDetailsApi(id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to add attachment');
        return rejectWithValue(error);
    }
});

export const deleteProjectAttachment = createAsyncThunk('projectDetails/deleteProjectAttachment', async (id, thunkAPI) => {
    try {
        await removeProjectAttachmentApi(id);
        toast.success('Attachment deleted successfully!');
        return await getProjectDetailsApi(thunkAPI.getState().projectDetails.details.id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete attachment');
        throw error;
    }
});

export const saveProjectTranslation = createAsyncThunk('projectDetails/saveProjectTranslation', async ({ id, data }, { rejectWithValue }) => {
    try {
        await addProjectTranslationApi(id, data);
        toast.success('Translation added successfully!');
        return await getProjectDetailsApi(id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to add translation');
        return rejectWithValue(error);
    }
});

export const deleteProjectTranslation = createAsyncThunk('projectDetails/deleteProjectTranslation', async (id, thunkAPI) => {
    try {
        await deleteProjectTranslationApi(id);
        toast.success('Translation deleted successfully!');
        return await getProjectDetailsApi(thunkAPI.getState().projectDetails.details.id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete translation');
        throw error;
    }
});

export const updateProjectTranslation = createAsyncThunk('projectDetails/updateProjectTranslation', async ({ id, data }, thunkAPI) => {
    try {
        await updateProjectTranslationApi(id, data);
        toast.success('Translation updated successfully!');
        return await getProjectDetailsApi(thunkAPI.getState().projectDetails.details.id);
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to update translation');
        throw error;
    }
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
