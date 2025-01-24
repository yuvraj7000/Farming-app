import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ln : null,
}

export const listSlice = createSlice({
    name : "options",
    initialState,
    reducers : {
        setLanguage : (state,action)=>{
            state.ln = action.payload
        },
        
    }
})

export const {setLanguage } = listSlice.actions;


export default listSlice.reducer;