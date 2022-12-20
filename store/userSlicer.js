import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userIsAuthenticated",
  initialState: false,
  reducers: {},
});

export default userSlice.reducer;
