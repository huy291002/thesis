import { createSlice } from "@reduxjs/toolkit";

const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState: {
        status: 'idle',
        message: ""
    },
    reducers: {
        setUpdateUserStatus(state, action){
            return action.payload
        }
    }
})

export default updateUserSlice
