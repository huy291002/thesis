import { createSlice } from "@reduxjs/toolkit";

const detailUserSlice = createSlice({
    name: 'detailUser',
    initialState: null,
    reducers: {
        setDetailUser(state, action){
            return action.payload
        }
    }
})

export default detailUserSlice