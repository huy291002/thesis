import { createSlice } from "@reduxjs/toolkit";

const processedDataStatusSlice = createSlice({
    name: 'processedDataStatus',
    initialState: false,
    reducers: {
        setProcessedDataStatus(state, action){
            return action.payload
        }
    }
})

export default processedDataStatusSlice