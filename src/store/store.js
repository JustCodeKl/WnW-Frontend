import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice";
import { usersReducer } from "./users-slice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer
    }
})

export default store;