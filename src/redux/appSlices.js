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
      state.user = "";
    },
  },
});
//#endregion

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

//#endregion 


export const { setIsLoading } = appSlice.actions;

export const { logout } = userSlice.actions;

export const { setUserDetail } = userSlice.actions;

export default userSlice.reducer;
