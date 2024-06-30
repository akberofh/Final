import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/authSlice";
import todoSlice from "./Slice/todoSlice";
import { apiSlice } from "./Slice/apiSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        todos: todoSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
