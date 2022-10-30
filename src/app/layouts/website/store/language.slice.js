import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    langs: {
        en: { nativeSymbol: 'EN', name: 'English' },
        fr: { nativeSymbol: 'FR', name: 'French' },
    },
    selectedLanguage: 'en',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.selectedLanguage = action.payload;
        },
    },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
