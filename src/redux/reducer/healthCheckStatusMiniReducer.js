import { createSlice } from "@reduxjs/toolkit";

const healthCheckStatusMiniSlice = createSlice({
    name: 'healthCheckStatusMini',
    initialState: "pending",
    reducers: {
        setHealthCheckStatusMini(state, action){
            return action.payload
        }
    }
})

export default healthCheckStatusMiniSlice