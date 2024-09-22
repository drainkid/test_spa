import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Включение DevTools только в режиме разработки

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
