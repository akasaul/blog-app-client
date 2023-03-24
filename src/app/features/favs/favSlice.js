import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Login from "../../../pages/Login";
import favAPI from "./favAPI";

const initialState = {
    fav: null, 
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    errors: null
}


export const toggleFav = createAsyncThunk(
    'fav/toggleFav', 
    async (id, thunkAPI) => {
        try {
          return await favAPI.toggleFav(id, thunkAPI.getState().auth.user.token)
        } catch(err) {
            const message = err.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)


const favSlice = createSlice({
    name: 'favs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Toggle Favorites 
            .addCase(toggleFav.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isFailed = false;
                state.errors = null;
            }) 
            .addCase(toggleFav.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.errors = action.payload;
            }) 
            .addCase(toggleFav.fulfilled, (state, action) => {
                state.fav = action.payload;
                state.isLoading = false;
                state.isFailed = false;
                state.isSuccess = true;
                state.errors = null;
            }) 
    }
})

export default favSlice.reducer;