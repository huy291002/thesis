import { createSlice } from "@reduxjs/toolkit";

const listWorkflowSlice = createSlice({
    name: 'listWorkflow',
    initialState: null,
    reducers: {
        setListWorkflow(state, action){
            return action.payload
        }
    }
})

export default listWorkflowSlice