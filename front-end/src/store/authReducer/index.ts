import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "..";
import {
  getMeAsyncThunk,
  loginAsyncThunk,
  signupAsyncThunk,
} from "./asyncThunk";
import { IAuthState } from "./interface";

const initState: IAuthState = {
  authData: null,
  userInfo: null,
  is_loading: false,
  is_loading_get_me: false,
  sign_up_success: false,
};

export const authStateSlide = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    checkCacheAuthAction: (state) => {
      const getAuthLocal = localStorage.getItem("authData");
      if (!getAuthLocal) return;
      state.authData = JSON.parse(getAuthLocal);
    },
    logoutAction: (state) => {
      localStorage.removeItem("authData");
      state.authData = null;
      state.userInfo = null;
      toast.success("Logout successful", {});
    },
    setSignUpSuccess: (state, action) => {
      state.sign_up_success = action.payload;
    },
  },
  extraReducers: (builder) => {
    /* Login action */
    builder.addCase(loginAsyncThunk.pending, (state, action) => {
      state.is_loading = true;
    });
    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      state.is_loading = false;
      state.authData = action.payload;
      localStorage.setItem("authData", JSON.stringify(action.payload));
      toast.success("Login successful", {});
    });
    builder.addCase(loginAsyncThunk.rejected, (state, action) => {
      state.is_loading = false;
      toast.error("Username and password invalid please try again", {});
    });

    /* Signup action */
    builder.addCase(signupAsyncThunk.pending, (state, action) => {
      state.is_loading = true;
      state.sign_up_success = false;
    });
    builder.addCase(signupAsyncThunk.fulfilled, (state, action) => {
      state.is_loading = false;
      state.sign_up_success = true;
      toast.success("Signup successful please login", {});
    });
    builder.addCase(signupAsyncThunk.rejected, (state, action) => {
      state.is_loading = false;
      state.sign_up_success = false;
      toast.error(`${action.payload}`, {});
    });

    /* Get me action */
    builder.addCase(getMeAsyncThunk.pending, (state, action) => {
      state.is_loading_get_me = true;
    });
    builder.addCase(getMeAsyncThunk.fulfilled, (state, action) => {
      state.is_loading_get_me = false;

      state.userInfo = action.payload as any;
    });
    builder.addCase(getMeAsyncThunk.rejected, (state, action) => {
      state.is_loading_get_me = false;
      toast.error("Error when get your info, please try again", {});
    });
  },
});

export const { checkCacheAuthAction, logoutAction, setSignUpSuccess } =
  authStateSlide.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authStateSlide.reducer;
