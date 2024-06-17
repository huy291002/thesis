import { createSlice } from "@reduxjs/toolkit";

const listGroupSlice = createSlice({
    name: 'listGroup',
    initialState: null,
    reducers: {
        setListGroup(state, action){
            return action.payload
        }
    }
})

export default listGroupSlice;