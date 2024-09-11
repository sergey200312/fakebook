import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.token = payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', payload);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;