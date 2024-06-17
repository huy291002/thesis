import { createSlice } from "@reduxjs/toolkit";

const listUserSlice = createSlice({
    name: 'listUser',
    initialState: {
        "count": 0,
        "data": []
    },
    reducers: {
        setListUser(state, action){
            return action.payload
        }
    }
})

export default listUserSlice