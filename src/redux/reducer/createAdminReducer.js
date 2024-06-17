import { createSlice } from "@reduxjs/toolkit";

const createAdminSlice = createSlice({
    name: 'createAdmin',
    initialState: {
        status: 'idle',
        message: ""
    },
    reducers: {
        setCreateAdminStatus(state, action){
            return action.payload
        }
    }
})

export default createAdminSlice
