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
  dialogState: {
    open: false,
    title: "Confirm Delete",
    message: "Are you sure you want to delete?",
    confirmText: "Delete",
    color: "error",
    onConfirm: null,
    params: []
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

export const { setUserDetail,updateToken } = userSlice.actions;

export default userSlice.reducer;
