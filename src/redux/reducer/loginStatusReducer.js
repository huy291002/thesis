import { createSlice } from "@reduxjs/toolkit";

const loginStatusSlice = createSlice({
    name: 'loginStatus',
    initialState: {
        status: "idle",
        message: ""
    },
    reducers: {
        setLoginStatus(state, action) {
            return action.payload
        }

    }

})

export default loginStatusSlice