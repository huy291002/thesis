import { createSlice } from "@reduxjs/toolkit";

const listModelPrototypeSlice = createSlice({
    name: 'listModelPrototype',
    initialState: [],
    reducers: {
        setListModelPrototype(state, action){
            return action.payload
        }
    }
})

export default listModelPrototypeSlice