import { createSlice } from "@reduxjs/toolkit";

const fieldStatusSlice = createSlice({
    name: 'fieldStatus',
    initialState: {
        status: 'idle',
        message: ""
    },
    reducers: {
        setFieldStatus(state, action){
            return action.payload
        }
    }
})

export default fieldStatusSlice