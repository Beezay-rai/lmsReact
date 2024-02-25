import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  approvalStatus : "",
};

export const initialStatev2={
    features:{
      isLoading:true,
    }
}


export const userSlicev2 = createSlice({
  name:"userDetailv2",
  initialState:initialStatev2,
  reducers:{
    setIsLoading:(state,action)=>{
      state.features.isLoading = action.payload
    },
    reset:(state,action)=>{
      state =initialStatev2
    },
  }
});


export const {setIsLoading} = userSlicev2.actions;
export const {reset} = userSlicev2.actions;



export const userSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.user = action.payload;
    },
    logout : (state) => {
      state.user=null;
      localStorage.removeItem("user")
    },
    approvalStatus : (state,action) => {
      state.approvalStatus = action.payload
    }
  },
});




export const { logout } = userSlice.actions;

export const { setUserDetail } = userSlice.actions;

export const { approvalStatus } = userSlice.actions;

export default userSlice.reducer;




