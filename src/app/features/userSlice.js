import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null, 
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    errors: null
}

const API_URL = 'http://localhost:5000/auth/signup';

export const signUp = createAsyncThunk(
    'user/signup', 
    async (formData, thunkAPI) => {
        try {
            const res = await axios.post(API_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            return res.data;

        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state, action) => {
                state.isLoading = true;
            }) 
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(signUp.fulfilled, (state, action) => {

                console.log(action.payload);
                state.user = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
            }) 
    }
})

export const { signup } = userSlice.actions;
export default userSlice.reducer;