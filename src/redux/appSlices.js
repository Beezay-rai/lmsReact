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
    title: "Confirm Delete",
    message: "Are you sure you want to delete?",
    confirmText: "Delete",
    color: "error"
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
      state.dialogState =action.payload; 
    },
    openDialog:(state, action) => {
      state.dialogState.open =true;
    },
    closeDialog:(state, action) => {
      state.dialogState.open =false;
    },
  },
});

export const { setIsLoading, setDialogState,closeDialog,openDialog } = appSlice.actions;

export const { logout } = userSlice.actions;

export const { setUserDetail } = userSlice.actions;

export default userSlice.reducer;
