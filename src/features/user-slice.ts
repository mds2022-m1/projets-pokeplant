// DUCKS pattern

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id?: string;
    name?: string;
    gender?: "Male" | "Female";
}

const initialState: User = {
    id: "",
    name: "",
    gender: "Male",
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userCreated: (state, action: PayloadAction<User>) => {
            // Timestamp provided by store
            const user : User = {
                ...action.payload,
                id: uuidv4(),
            }
            state.id = user.id;
            state.name = user.name;
            state.gender = user.gender;
        },
        userIdChanged: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        userNameChanged: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        userGenderChanged: (state, action: PayloadAction<"Male" | "Female">) => {
            state.gender = action.payload;
        },
    }
});

export const { userCreated, userNameChanged, userIdChanged, userGenderChanged } = userSlice.actions;

export default userSlice.reducer;

// Path: src/features/chat/chat.tsx