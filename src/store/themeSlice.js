import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        lightTheme: true,
    },
    reducers: {
        changeTheme(state, action) {
            state.lightTheme = !state.lightTheme
        }
    }
})

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;