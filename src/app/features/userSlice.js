import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       
    }
})

export const { signup } = userSlice.actions;
export default userSlice.reducer;