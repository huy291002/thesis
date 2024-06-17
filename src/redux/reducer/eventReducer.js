import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        NOTI: 'noti',
        PROCESS: 'process'
    },
    reducers: {
        setEvent(state, action){
            return action.payload
        }
    }
})

export default eventSlice;