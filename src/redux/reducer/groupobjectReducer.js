import { createSlice } from "@reduxjs/toolkit";

const groupobjectSlice = createSlice({
    name: 'groupobject',
    initialState: {
        status: 'idle',
    },
    reducers: {
        setGroupObject(state, action){
            return action.payload
        }
    }
})

export default groupobjectSlice