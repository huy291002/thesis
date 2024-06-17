import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
    name: 'template',
    initialState: {
        status: 'idle',
        message: ""
    },
    reducers: {
        setTemplate(state, action){
            return action.payload
        }
    }
})

export default templateSlice