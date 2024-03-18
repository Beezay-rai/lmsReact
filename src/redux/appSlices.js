import { createSlice } from "@reduxjs/toolkit";

const userState = {
  user: "",
};
//#region User Detail
export const userSlice = createSlice({
  name: "User Detail",
  initialState: userState,
  reducers: {
    setUserDetail: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
//#endregion
export const { logout } = userSlice.actions;

export const { setUserDetail } = userSlice.actions;

//#region AppStates
const appState = {
  isLoading: false,
};
export const appSlice = createSlice({
  name: "App Features",
  initialState: appState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = appSlice.actions;
//#endregion 



export default userSlice.reducer;
