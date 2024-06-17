import { createSlice } from "@reduxjs/toolkit";

const updateAdminSlice = createSlice({
    name: 'updateAdmin',
    initialState: {
        status: 'idle',
        message: ""
    },
    reducers: {
        setUpdateAdminStatus(state, action){
            return action.payload
        }
    }
})

export default updateAdminSlice
