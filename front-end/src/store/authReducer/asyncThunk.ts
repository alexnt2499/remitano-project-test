import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { apiAuth } from "../../apis";
import { LoginParamsType, SignupParamsType } from "../../apis/types/AuthType";

const loginAsyncThunk = createAsyncThunk(
  "auth/login",
  async (params: LoginParamsType, thunkAPI) => {
    const res = await apiAuth.login({
      email: params.email,
      password: params.password,
    });

    return res;
  }
);

const signupAsyncThunk = createAsyncThunk(
  "auth/signup",
  async (params: SignupParamsType, thunkAPI) => {
    try {
      const res = await apiAuth.signUp({
        email: params.email,
        password: params.password,
        name: params.name,
      });

      return res;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      let errorMsg = "Opoos something went wrong please try again";
      if (error?.response?.data?.error?.invalid_form["email"])
        errorMsg =
          "email " + error?.response?.data?.error?.invalid_form["email"][0];
      if (error?.response?.data?.error?.invalid_form["name"])
        errorMsg =
          "name " + error?.response?.data?.error?.invalid_form["name"][0];
      if (error?.response?.data?.error?.invalid_form["password"])
        errorMsg =
          "password " +
          error?.response?.data?.error?.invalid_form["password"][0];
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

const getMeAsyncThunk = createAsyncThunk(
  "auth/getMe",
  async (params, thunkAPI) => {
    const state: RootState | any = thunkAPI.getState();
    if (!state.auth?.authData) return null;
    const res = await apiAuth.getMe(state.auth.authData.auth_token);

    return res;
  }
);

export { loginAsyncThunk, getMeAsyncThunk, signupAsyncThunk };
