import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from './userAPI';

const initialState = {
    user: null, 
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    errors: null
}


// export const signUp = createAsyncThunk(
//     'user/signup', 
//     async (formData, thunkAPI) => {
//         try {
//             const res = await axios.post(API_URL, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             });

//             return res.data;

//         } catch(err) {
//             const message = err.response.data.message;
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// )

export const addUserDetails = createAsyncThunk(
    'user/addUserDetails', 
    async (formData, thunkAPI) => {
        try {
            const {token, id} = thunkAPI.getState().auth.user;
            const res = await userAPI.addUserDetails(token, id, formData);
            return res.data;

        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getMe = createAsyncThunk(
    'user/getMe', 
    async (_, thunkAPI) => {
        try {
            const res = await userAPI.getMe(thunkAPI.getState().auth.user.token);
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
            // .addCase(signUp.pending, (state, action) => {
            //     state.isLoading = true;
            // }) 
            // .addCase(signUp.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = false;
            //     state.isFailed = true;
            //     state.errors = action.payload;
            // }) 
            // .addCase(signUp.fulfilled, (state, action) => {
            //     state.user = action.payload;
            //     state.isLoading = false;
            //     state.isFailed = false;
            //     state.isSuccess = true;
            // }) 

        // add user details 
            .addCase(addUserDetails.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.errors = null;
            }) 
            .addCase(addUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = [...action.payload];
            }) 
            .addCase(addUserDetails.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            }) 


              // add user details 
              .addCase(getMe.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
            }) 
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            }) 
    }
})

export default userSlice.reducer;