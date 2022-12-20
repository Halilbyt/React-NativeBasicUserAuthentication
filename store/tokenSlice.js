import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tokenSlice = createSlice({
  name: "tokenId",
  initialState: {
    token: [{ token: "", isAuthenticated: false }],
  },
  reducers: {
    authenticateUser: (state, action) => {
      const storedTokenData = {
        token: action.payload.tokenId,
        isAuthenticated: true,
      };
      state.token = [storedTokenData];
      AsyncStorage.setItem("token", action.payload.tokenId);
    },
    logout: (state) => {
      state.token = [{ token: "", isAuthenticated: false }];
      AsyncStorage.removeItem("token");
    },
  },
});

export const { authenticateUser, logout } = tokenSlice.actions;
export default tokenSlice.reducer;

/*

async function fetchToken() {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    initialStateData.token = token;
    initialStateData.isAuthenticated = true;
  }
  console.log(
    "inside the fetchToken function : " + initialStateData.isAuthenticated
  );
}
fetchToken();

*/
