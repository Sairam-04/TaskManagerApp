import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/slice";
import todoSlice from "../features/task/slice";

export const store = configureStore({
    reducer:{
        users: userSlice,
        todos: todoSlice
    }
})