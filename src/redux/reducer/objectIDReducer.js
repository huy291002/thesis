import { createSlice } from "@reduxjs/toolkit";

const objectIDSlice = createSlice({
    name: 'objectID',
    initialState: null,
    reducers: {
        setObjectID(state, action){
            return action.payload
        }
    }
})

export default objectIDSlice;