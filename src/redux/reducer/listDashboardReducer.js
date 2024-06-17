import { createSlice } from "@reduxjs/toolkit";

const listDashboardSlice = createSlice({
    name: 'listDashboard',
    initialState: [],
    reducers: {
        setListDashboard(state, action){
            return action.payload
        }
    }
})

export default listDashboardSlice