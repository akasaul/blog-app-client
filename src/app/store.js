import {configureStore} from '@reduxjs/toolkit'
// import userReducer from './features/userSlice'
import authReducer from './features/auth/authSlice';
import commentReducer from './features/comment/commentSlice';
import postReducer from './features/post/postSlice';
import reactionReducer from './features/reaction/reactionSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        comment: commentReducer,
        reaction: reactionReducer
    }
})