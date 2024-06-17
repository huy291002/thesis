import { createSlice } from "@reduxjs/toolkit";

const healthCheckStatusBigSlice = createSlice({
    name: 'healthCheckStatusBig',
    initialState: "pending",
    reducers: {
        setHealthCheckStatusBig(state, action){
            return action.payload
        }
    }
})

export default healthCheckStatusBigSlice