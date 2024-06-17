import { createSlice } from "@reduxjs/toolkit";

const customViewSlice = createSlice({
    name: 'customView',
    initialState: {
        status: 'idle',
        message: "",
        quantity: []
    },
    reducers: {
        setCustomView(state, action){
            return action.payload
        }
    }
})

export default customViewSlice