import { createSlice } from "@reduxjs/toolkit";

const statusFormSlice = createSlice({
    name: 'statusForm',
    initialState: {
        status: 'idle',
    },
    reducers: {
        setStatusForm(state, action){
            return action.payload
        }
    }
})

export default statusFormSlice