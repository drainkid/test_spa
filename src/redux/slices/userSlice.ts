import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userRecord } from '../../types';

interface UserState {
    userData: userRecord[] | null;
}

const initialState: UserState = {
    userData: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<userRecord[]>) => {
            state.userData = action.payload;
        },
        addUserData: (state, action: PayloadAction<userRecord>) => {
            state.userData = state.userData ? [...state.userData, action.payload] : [action.payload];
        },
        removeUserData: (state, action: PayloadAction<string>) => {
            state.userData = state.userData?.filter((user) => user.id !== action.payload) || null;
        },
    },
});

export const { setUserData, addUserData,
    removeUserData } = userSlice.actions;

export default userSlice.reducer;
