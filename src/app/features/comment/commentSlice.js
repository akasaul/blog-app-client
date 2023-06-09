import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Login from "../../../pages/Login";
import commentAPI from './commentAPI';


const initialState = {
    comment: null, 
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    errors: null
}


export const postComment = createAsyncThunk(
    'comment/postComment', 
    async (formData, thunkAPI) => {
        try {
          return await commentAPI.postComment(formData, thunkAPI.getState().auth.user.token)
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)


export const deleteComment = createAsyncThunk(
    'comment/deleteComment', 
    async (id, thunkAPI) => {
        try {
          return await commentAPI.deleteComment(id, thunkAPI.getState().auth.user.token)
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)



const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Post Comment 
            .addCase(postComment.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.errors = null;
            }) 
            .addCase(postComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(postComment.fulfilled, (state, action) => {
                state.comment = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            })
            
            // Delete Comment 
            .addCase(deleteComment.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.errors = null;
            }) 
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comment = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            }) 
    }
})

export default commentSlice.reducer;