import { createSlice } from "@reduxjs/toolkit";

const detailGroupSlice = createSlice({
    name: 'detailGroup',
    initialState: null,
    reducers: {
        setDetailGroup(state, action){
            return action.payload
        }
    }
})

export default detailGroupSlice;