import { createSlice } from "@reduxjs/toolkit";

const customDashboardSlice = createSlice({
    name: 'customDashboard',
    initialState: {
        status: 'idle',
        message: "",
        quantity: []
    },
    reducers: {
        setCustomDashboard(state, action){
            return action.payload
        }
    }
})

export default customDashboardSlice