import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer, { appSlice } from "./appSlices";

import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const persitConfig = {
  key: "storeTookit",
  version: 1,
  storage,
  timeout: 10,
};

const reducer = combineReducers({
  userDetail: userReducer,
  appFeature: appSlice.reducer,
});

const persistedReducer = persistReducer(persitConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
export { persistor };

