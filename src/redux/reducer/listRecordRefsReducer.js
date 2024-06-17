import { createSlice } from "@reduxjs/toolkit";

const listRecordRefsSlice = createSlice({
    name: 'listRecordRefs',
    initialState: null,
    reducers: {
        setListRecordRefs(state, action){
            return action.payload
        }
    }
})

export default listRecordRefsSlice;