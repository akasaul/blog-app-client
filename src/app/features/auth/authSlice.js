import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Login from "../../../pages/Login";
import authAPI from './authAPI';

const user = JSON.parse(localStorage.getItem('user')) || null; 

const initialState = {
    user, 
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    errors: null
}


export const signUp = createAsyncThunk(
    'auth/signup', 
    async (formData, thunkAPI) => {
        try {
          return await authAPI.signup(formData)
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const logIn = createAsyncThunk(
    'auth/login', 
    async (formData, thunkAPI) => {
        try {
          return await authAPI.login(formData)
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut(state, action) {
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            // Sign up 

            .addCase(signUp.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.errors = null;
            }) 
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(signUp.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload));
                state.user = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            }) 

        // Login 
            .addCase(logIn.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.errors = null;
            }) 
            .addCase(logIn.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(logIn.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload));
                state.user = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            }) 
    }
})

export const { signOut } = authSlice.actions;
export default authSlice.reducer;