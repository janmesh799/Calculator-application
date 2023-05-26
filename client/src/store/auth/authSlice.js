import { createSlice } from "@reduxjs/toolkit"

const authToken = localStorage.getItem('authToken')

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    user: null,
    authToken: authToken ? authToken : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})
export const { } = authSlice.actions;
export default authSlice.reducer;