import { createSlice } from "@reduxjs/toolkit";

const listEmailSlice = createSlice({
    name: 'listEmail',
    initialState: [],
    reducers: {
        setListEmail(state, action){
            return action.payload
        }
    }
})

export default listEmailSlice