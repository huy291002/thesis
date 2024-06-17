import { createSlice } from "@reduxjs/toolkit";

const objectSlice = createSlice({
    name: 'object',
    initialState: {
        status: 'idle',
        message: "",
        quantity: []
    },
    reducers: {
        setObject(state, action){
            return action.payload
        }
    }
})

export default objectSlice