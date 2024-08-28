import userSlice from "./features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        user: userSlice,
    }
})