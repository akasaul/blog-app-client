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


// export const getPosts = createAsyncThunk(
//   'post/getPosts', 
//   async (_, thunkAPI) => {
//       try {
//         return await postAPI.getPosts()
//       } catch(err) {
//           const message = err.response.data.message;
//           return thunkAPI.rejectWithValue(message);
//       }
//   }
// )

// export const getPost = createAsyncThunk(
//     'post/getPost', 
//     async (id, thunkAPI) => {
//         try {
//           return await postAPI.getPost(id);
//         } catch(err) {
//             const message = err.response.data.message;
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
//   )


const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Post 
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
    }
})

export default commentSlice.reducer;