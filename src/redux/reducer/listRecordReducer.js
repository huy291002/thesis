import { createSlice } from "@reduxjs/toolkit";

const listRecordSlice = createSlice({
    name: 'listRecord',
    initialState: {
        "total_records": 0,
        "record_details": []
    },
    reducers: {
        setListRecord(state, action){
            return action.payload
        }
    }
})

export default listRecordSlice