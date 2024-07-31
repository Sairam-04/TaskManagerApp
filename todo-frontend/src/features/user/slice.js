import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./service";

const initialState = {
  loginData: {
    status: "init",
    error: "",
    data: [],
  },
  registerData: {
    status: "init",
    error: "",
    data: [],
  },
  fetchUserData: {
    status: "init",
    error: "",
    data: [],
  },
};

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.LoginUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.RegisterUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.GetUserDetails();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginData.status = "pending";
        state.loginData.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginData.status = "idle";
        state.loginData.error = "";
        state.loginData.data = action.payload || [];
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginData.status = "rejected";
        state.loginData.error = action.payload;
        state.loginData.data = [];
      })
      .addCase(registerUser.pending, (state) => {
        state.registerData.status = "pending";
        state.registerData.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerData.status = "idle";
        state.registerData.data = action.payload || [];
        state.registerData.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerData.status = "rejected";
        state.registerData.error = action.payload;
        state.registerData.data = [];
      })
      .addCase(fetchUser.pending, (state) => {
        state.fetchUserData.status = "pending";
        state.fetchUserData.error = "";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchUserData.status = "idle";
        state.fetchUserData.data = action.payload || [];
        state.fetchUserData.error = "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchUserData.status = "rejected";
        state.fetchUserData.error = action.payload;
        state.fetchUserData.data = [];
      });
  },
});

export default userSlice.reducer;
