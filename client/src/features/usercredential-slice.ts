// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {}

export const userCredentialsSlice = createSlice({
  name: "userCredentials",
  initialState,
  reducers: {
    userLogIn: (state, action: PayloadAction) => {
      localStorage.setItem("userCredentials", JSON.stringify(action.payload));
    },
    userLogOut: (state) => {
      console.log(state);
      localStorage.setItem("userCredentials", JSON.stringify({}));
    },
  },
});

export const { userLogIn, userLogOut } = userCredentialsSlice.actions;

export default userCredentialsSlice.reducer;
