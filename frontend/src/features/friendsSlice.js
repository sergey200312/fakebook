import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    friends: []
}

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setFriends: (state, { payload }) => {
            state.friends = payload;
        }
    }
})