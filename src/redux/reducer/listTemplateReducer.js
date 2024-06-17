import { createSlice } from "@reduxjs/toolkit";

const listTemplateSlice = createSlice({
    name: 'listTemplate',
    initialState: [],
    reducers: {
        setListTemplate(state, action){
            return action.payload
        }
    }
})

export default listTemplateSlice