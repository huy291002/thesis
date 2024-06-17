import { createSlice } from "@reduxjs/toolkit";

const listObjectRefsSlice = createSlice({
    name: 'listObjectRefs',
    initialState: null,
    reducers: {
        setListObjectRefs(state, action){
            return action.payload
        }
    }
})

export default listObjectRefsSlice;