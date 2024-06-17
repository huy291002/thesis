import { createSlice } from "@reduxjs/toolkit";

const openSidebarSlice = createSlice({
    name: 'openSidebar',
    initialState: false,
    reducers: {
        setOpenSidebar(state, action){
  
            return action.payload
        }
    }
})

export default openSidebarSlice;