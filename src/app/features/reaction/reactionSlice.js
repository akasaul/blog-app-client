import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Login from "../../../pages/Login";
import reactionAPI from './reactionAPI';


const initialState = {
    reaction: null, 
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    errors: null
}


export const postReaction = createAsyncThunk(
    'reaction/postReaction', 
    async (formData, thunkAPI) => {
        try {
          return await reactionAPI.postReaction(formData, thunkAPI.getState().auth.user.token)
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)


export const deleteReaction = createAsyncThunk(
    'reaction/deleteReaction', 
    async (id, thunkAPI) => {
        try {
          return await reactionAPI.deleteReaction(id, thunkAPI.getState().auth.user.token)
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)



const reactionSlice = createSlice({
    name: 'reaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Post Reaction 
            .addCase(postReaction.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.errors = null;
            }) 
            .addCase(postReaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(postReaction.fulfilled, (state, action) => {
                state.reaction = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            })
            
            // Delete Reaction 
            .addCase(deleteReaction.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.errors = null;
            }) 
            .addCase(deleteReaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(deleteReaction.fulfilled, (state, action) => {
                state.reaction = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            }) 
    }
})

export default reactionSlice.reducer;