import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    currentUser: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.token = payload.token;
            state.isAuthenticated = true;
            state.currentUser = payload.currentUser;
            localStorage.setItem('token', payload.token);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.currentUser = null;
            localStorage.removeItem('token');
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;