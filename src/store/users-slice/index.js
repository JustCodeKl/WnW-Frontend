import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  usersList: [],
  userBooking: [],
};

export const getUsers = createAsyncThunk(
  "/users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://wnw-api.onrender.com/api/users/get-all-users",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserBookings = createAsyncThunk(
  "/users/getUserBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://wnw-api.onrender.com/api/users/user-bookings",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.pending, (state) => {
        state.usersList = [];
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersList = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.usersList = action.payload || "Registration failed";
      })
      .addCase(getUserBookings.pending, (state) => {
        state.userBooking = [];
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.userBooking = action.payload.data;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.userBooking = action.payload || "Registration failed";
      }),
});

export const usersReducer = usersSlice.reducer;
