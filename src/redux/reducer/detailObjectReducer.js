import { createSlice } from "@reduxjs/toolkit";

const detailObjectSlice = createSlice({
    name: 'detailObject',
    initialState: null,
    reducers: {
        setDetailObject(state, action){
            return action.payload
        }
    }
})

export default detailObjectSlice;