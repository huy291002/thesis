import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        status: 'idle',
        message: ""
    },
    reducers: {
        setEmail(state, action){
            return action.payload
        }
    }
})

export default emailSlice