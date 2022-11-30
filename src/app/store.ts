import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user-slice";
import userCredentialsReducer from "../features/usercredential-slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        userCrendentials: userCredentialsReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
