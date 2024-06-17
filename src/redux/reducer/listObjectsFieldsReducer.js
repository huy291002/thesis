import { createSlice } from "@reduxjs/toolkit";

const listObjectsFieldsSlice = createSlice({
    name: 'listObjectsFields',
    initialState: null,
    reducers: {
        setListObjectsFields(state, action){
            return action.payload
        }
    }
})

export default listObjectsFieldsSlice;