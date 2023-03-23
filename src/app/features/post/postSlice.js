import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Login from "../../../pages/Login";
import postAPI from './postAPI';


const initialState = {
    posts: [], 
    post: null, 
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    errors: null,
    isDeleted: false
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

export const getPost = createAsyncThunk(
    'post/getPost', 
    async (id, thunkAPI) => {
        try {
          return await postAPI.getPost(id);
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
  )


  export const deletePost = createAsyncThunk(
    'post/deletePost', 
    async (id, thunkAPI) => {
        try {
          return await postAPI.deletePost(id, thunkAPI.getState().auth.user.token);
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
  )

  export const updatePost = createAsyncThunk(
    'post/updatePost', 
    async ({formData, id}, thunkAPI) => {
        try {
          return await postAPI.updatePost(formData, id, thunkAPI.getState().auth.user.token);
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
  )



const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset(state) {
            state.post = null;
            state.isLoading = false;
            state.isFailed = false;
            state.isSuccess = false;
        }
    },
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

            // Create Post 
            .addCase(getPosts.pending, (state, action) => {
              state.isLoading = true;
              state.isSuccess = false;
              state.isFailed = false;
              state.errors = null;
          }) 
          .addCase(getPosts.rejected, (state, action) => {
              state.isLoading = false;
              state.isSuccess = false;
              state.isFailed = true;
              state.errors = action.payload;
          }) 
          .addCase(getPosts.fulfilled, (state, action) => {
              state.posts = action.payload;
              state.isLoading = false;
              state.isFailed = false;
              state.isSuccess = true;
              state.errors = null;
          }) 


        // Get Post 
        .addCase(getPost.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isFailed = false;
            state.errors = null;
        }) 
        .addCase(getPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isFailed = true;
            state.errors = action.payload;
        }) 
        .addCase(getPost.fulfilled, (state, action) => {
            state.post = action.payload;
            state.isLoading = false;
            state.isFailed = false;
            state.isSuccess = true;
            state.errors = null;
        }) 

         // Delete Post 
         .addCase(deletePost.pending, (state, action) => {
            state.isDeleted = false;
            state.isLoading = true;
            state.isSuccess = false;
            state.isFailed = false;
            state.errors = null;
        }) 
        .addCase(deletePost.rejected, (state, action) => {
            state.isDeleted = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.isFailed = true;
            state.errors = action.payload;
        }) 
        .addCase(deletePost.fulfilled, (state, action) => {
            state.isDeleted = true;
            state.isLoading = false;
            state.isFailed = false;
            state.isSuccess = true;
            state.errors = null;
        }) 


          // Update Post 
          .addCase(updatePost.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isFailed = false;
            state.errors = null;
        }) 
        .addCase(updatePost.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isFailed = true;
            state.errors = action.payload;
        }) 
        .addCase(updatePost.fulfilled, (state, action) => {
            state.post = action.payload;
            state.isLoading = false;
            state.isFailed = false;
            state.isSuccess = true;
            state.errors = null;
        }) 
          
    }
})

export const { reset } = postSlice.actions;

export default postSlice.reducer;