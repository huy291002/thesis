import { createSlice } from "@reduxjs/toolkit";

const listRecordProcessedSlice = createSlice({
    name: 'listRecordProcessed',
    initialState: {
        "records": [],
        "labels": [],
        "counts": [],
        "field_mappings": {}
    },
    reducers: {
        setListRecordProcessed(state, action){
            return action.payload
        }
    }
})

export default listRecordProcessedSlice