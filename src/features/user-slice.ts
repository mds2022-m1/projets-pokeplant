// DUCKS pattern

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id?: string;
    name?: string;
}

const initialState: User = {
    id: undefined,
    name: undefined,
};
//const auth = getAuth();

    

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
        },
        userLoggedOut: (state) => {
            state.id = undefined;
            state.name = undefined;
        }
    }
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
