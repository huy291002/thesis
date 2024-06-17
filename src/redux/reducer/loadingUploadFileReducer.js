import { createSlice } from "@reduxjs/toolkit";

const loadingUploadFileSlice = createSlice({
    name: 'loadingUploadFile',
    initialState: false,
    reducers: {
        setLoadingUploadFile(state, action){
            return action.payload
        }
    }
})

export default loadingUploadFileSlice