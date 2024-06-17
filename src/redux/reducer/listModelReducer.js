import { createSlice } from "@reduxjs/toolkit";

const listModelSlice = createSlice({
    name: 'listModel',
    initialState: null,
    reducers: {
        setListModel(state, action){
            return action.payload
        }
    }
})

export default listModelSlice;