import { createSlice } from "@reduxjs/toolkit";

const uploadFileSlice = createSlice({
    name: 'uploadFile',
    initialState: {
        status: 'idle',
        message: "",
        quantity: []
    },
    reducers: {
        setUploadFile(state, action){
            return action.payload
        }
    }
})

export default uploadFileSlice