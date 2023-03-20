import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Login from "../../../pages/Login";
import postAPI from './postAPI';


const initialState = {
    posts: [], 
    post: null, 
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    errors: null
}


export const createPost = createAsyncThunk(
    'post/createPost', 
    async (formData, thunkAPI) => {
        try {
          return await postAPI.createPost(formData, thunkAPI.getState().auth.user.token)
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)


export const getPosts = createAsyncThunk(
  'post/getPosts', 
  async (_, thunkAPI) => {
      try {
        return await postAPI.getPosts()
      } catch(err) {
          const message = err.response.data.message;
          return thunkAPI.rejectWithValue(message);
      }
  }
)



const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Post 

            .addCase(createPost.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.errors = null;
            }) 
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(createPost.fulfilled, (state, action) => {
                state.post = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            }) 
    }
})

export default postSlice.reducer;