// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: string;
  name?: string;
  email?: string;
}

const initialState: User =
  localStorage.getItem("user") && localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem("user", JSON.stringify(state));
    },
    userLoggedOut: (state) => {
      console.log(state);
      state.id = undefined;
      state.name = undefined;
      state.email = undefined;
      localStorage.setItem("user", JSON.stringify({}));
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
