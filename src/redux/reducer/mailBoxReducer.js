import { createSlice } from "@reduxjs/toolkit";

const mailBoxSlice = createSlice({
    name: 'mailBox',
    initialState: false,
    reducers: {
        setMailBox(state, action){
            return action.payload
        }
    }
})

export default mailBoxSlice