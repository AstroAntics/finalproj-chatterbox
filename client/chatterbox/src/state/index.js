// Don't like using Redux too much but you gotta do what you gotta do...
// https://redux.js.org/introduction/getting-started#basic-example
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark', // Dark mode is the default here!
  user: null,
  token: null,
  posts: [],
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: state => {
      // Dark/light mode toggle
      state.mode === 'dark' ? (state.mode = 'light') : (state.mode = 'dark');
    },
    setLogin: (state, action) => {
      // Login handler
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: state => {
      // Logout handler
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      // Friends handler
      state.user.friends = action.payload.friends;
    },
    setPosts: (state, action) => {
      // Post handler
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const mappedPosts = state.posts.map(post => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = mappedPosts;
    },
  },
});

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authReducer.actions;
export default authReducer.reducer;