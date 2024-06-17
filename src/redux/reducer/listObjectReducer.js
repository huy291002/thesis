import { createSlice } from "@reduxjs/toolkit";

const listObjectSlice = createSlice({
    name: 'listObject',
    initialState: null,
    reducers: {
        setListObject(state, action){
            return action.payload
        }
    }
})

export default listObjectSlice;