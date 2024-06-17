import { createSlice } from "@reduxjs/toolkit";

const createWorkflowSlice = createSlice({
    name: 'createWorkflow',
    initialState: {
        status: 'idle',
        message: ""
    },
    reducers: {
        setCreateWorkflow(state, action){
            return action.payload
        }
    }
})

export default createWorkflowSlice