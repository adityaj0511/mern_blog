import { createSlice } from "@reduxjs/toolkit";

// initalstate
const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // singUp
    signUpRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.currentUser = null;
    },
    signUpSuccess(state, action) {
      state.loading = false;
      //   state.user = action.payload;
      state.error = null;
    },
    signUpFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // singIn
    signInRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.currentUser = null;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // case for update user data
    updateUserSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    }
  },
});

export const { signUpFailed, signUpRequest, signUpSuccess ,signInRequest,signInFailed,signInSuccess,updateUserSuccess } = authSlice.actions;

export default authSlice.reducer;
