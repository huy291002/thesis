import { createSlice } from "@reduxjs/toolkit";

const layoutViewSlice = createSlice({
    name: 'layoutView',
    initialState: null,
    reducers: {
        setLayoutView(state, action){
            return action.payload
        }
    }
})

export default layoutViewSlice;