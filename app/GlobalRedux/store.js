'use client';

import { configureStore } from "@reduxjs/toolkit";
import { Reducer } from "./Features/reducer";

const store = configureStore({
    reducer: {
        reducer: Reducer.reducer
    }
})

export default store
