import { createSlice } from "@reduxjs/toolkit";

const userState = {
  user: "",
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
  },
});

const appState = {
  isLoading: false,
  dialogState: {
    open: false,
    onConfirm: null,
  },
};
export const appSlice = createSlice({
  name: "App Features",
  initialState: appState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setDialogState: (state, action) => {
      state.dialogState.open = action.payload.open;
      state.dialogState.onConfirm = action.payload.onConfirm;
    },
  },
});

export const { setIsLoading, setDialogState } = appSlice.actions;

export const { logout } = userSlice.actions;

export const { setUserDetail } = userSlice.actions;

export default userSlice.reducer;
