import { createSlice } from "@reduxjs/toolkit";

const detailRefObjectSlice = createSlice({
    name: 'detailRefObject',
    initialState: null,
    reducers: {
        setDetailRefObject(state, action){
            return action.payload
        }
    }
})

export default detailRefObjectSlice;