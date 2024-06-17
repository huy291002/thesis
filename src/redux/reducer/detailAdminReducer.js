import { createSlice } from "@reduxjs/toolkit";

const detailAdminSlice = createSlice({
    name: 'detailAdmin',
    initialState: null,
    reducers: {
        setDetailAdmin(state, action){
            return action.payload
        }
    }
})

export default detailAdminSlice