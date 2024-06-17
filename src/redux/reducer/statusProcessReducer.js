import { createSlice } from "@reduxjs/toolkit";

const statusProcessSlice = createSlice({
    name: 'statusProcess',
    initialState: {
        status: 'idle',
    },
    reducers: {
        setStatusProcess(state, action){
            return action.payload
        }
    }
})

export default statusProcessSlice