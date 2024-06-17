import { createSlice } from "@reduxjs/toolkit";

const listAdminSlice = createSlice({
    name: 'listAdmin',
    initialState: {
        "count": 0,
        "data": []
    },
    reducers: {
        setListAdmin(state, action){
            return action.payload
        }
    }
})

export default listAdminSlice