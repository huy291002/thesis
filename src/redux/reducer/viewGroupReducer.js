import { createSlice } from "@reduxjs/toolkit";

const viewGroupSlice = createSlice({
    name: 'viewGroup',
    initialState: false,
    reducers: {
        setviewGroup(state, action){
        
            return action.payload
        }
    }
})

export default viewGroupSlice;