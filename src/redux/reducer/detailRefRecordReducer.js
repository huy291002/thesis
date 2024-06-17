import { createSlice } from "@reduxjs/toolkit";

const detailRefRecordSlice = createSlice({
    name: 'detailRefRecord',
    initialState: {
        "total_records": 0,
        "record_details": []
    },
    reducers: {
        setDetailRefRecord(state, action){
            return action.payload
        }
    }
})

export default detailRefRecordSlice;