import { createSlice } from "@reduxjs/toolkit";

const loadingSearchSlice = createSlice({
    name: 'loadingSearch',
    initialState: {
        big_table: false,
        mini_table: false
    },
    reducers: {
        setLoadingSearch(state, action){
            return action.payload
        }
    }
})

export default loadingSearchSlice