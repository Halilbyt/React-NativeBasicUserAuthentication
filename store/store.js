import { configureStore } from "@reduxjs/toolkit";
import tokenSlicer from "./tokenSlice";

const store = configureStore({
  reducer: {
    token: tokenSlicer,
  },
});

export default store;
