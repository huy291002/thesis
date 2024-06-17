import { createSlice } from "@reduxjs/toolkit";

const createRecordSlice = createSlice({
    name: 'createRecord',
    initialState: {
        status: 'idle',
        message: ""
    },
    reducers: {
        setCreateRecordStatus(state, action){
            return action.payload
        }
    }
})

export default createRecordSlice
