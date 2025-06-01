import { createSlice } from "@reduxjs/toolkit";

const userState = {
  user: {
    access_token: "",
    refresh_token: "",  
  },
};

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
    updateToken: (state, action) => {
      state.user.access_token = action.payload.access_token;
      state.user.refresh_token = action.payload.refresh_token;
    },
  },
});

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

export const { logout } = userSlice.actions;

export const { setUserDetail,updateToken } = userSlice.actions;

export default userSlice.reducer;
