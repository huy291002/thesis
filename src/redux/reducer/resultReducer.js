import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
    name: 'result',
    initialState: null,
    reducers: {
        setResult(state, action){
            return action.payload
        }
    }
})

export default resultSlice