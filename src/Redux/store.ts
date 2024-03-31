import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import putPostReducer from "./putPost";

export const store = configureStore({
    reducer: {
        get: postReducer,
        post: putPostReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
