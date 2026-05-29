import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import { authApi } from "../features/auth/authApi";
import { moviesApi } from "../features/moviesApi";
import { theatreApi } from "../features/theatreApi";
import { ticketApi } from "../features/ticketApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
        [theatreApi.reducerPath]: theatreApi.reducer,
        [ticketApi.reducerPath]:ticketApi.reducer,
    },
    middleware: (getdefaultMiddleware) =>
        getdefaultMiddleware()
            .concat(authApi.middleware)
            .concat(moviesApi.middleware)
            .concat(theatreApi.middleware)
            .concat(ticketApi.middleware)
});

export type RootState = ReturnType<
    typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;