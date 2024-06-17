import { createSlice } from "@reduxjs/toolkit";

const createUserSlice = createSlice({
    name: 'createUser',
    initialState: {
        status: 'idle',
        message: ""
    },
    reducers: {
        setCreateUserStatus(state, action){
            return action.payload
        }
    }
})

export default createUserSlice
