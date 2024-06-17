import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        setLoading(state, action){
            return action.payload
        }
    }
})

export default loadingSlice