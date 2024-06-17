import { createSlice } from "@reduxjs/toolkit";

const listAllTemplateSlice = createSlice({
    name: 'listAllTemplate',
    initialState: [],
    reducers: {
        setListAllTemplate(state, action){
            return action.payload
        }
    }
})

export default listAllTemplateSlice