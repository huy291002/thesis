import { createSlice } from "@reduxjs/toolkit";

const idGroupSlice = createSlice({
    name: 'idGroup',
    initialState: null,
    reducers: {
        setIdGroup(state, action){
            return action.payload
        }
    }
})

export default idGroupSlice;