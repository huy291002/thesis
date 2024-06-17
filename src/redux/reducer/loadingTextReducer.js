import { createSlice } from "@reduxjs/toolkit";

const loadingTextSlice = createSlice({
    name: 'loadingText',
    initialState: false,
    reducers: {
        setLoadingText(state, action){
            return action.payload
        }
    }
})

export default loadingTextSlice