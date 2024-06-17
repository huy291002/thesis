import { createSlice } from "@reduxjs/toolkit";

const loadingDatasetSlice = createSlice({
    name: 'loadingDataset',
    initialState: false,
    reducers: {
        setLoadingDataset(state, action){
            return action.payload
        }
    }
})

export default loadingDatasetSlice