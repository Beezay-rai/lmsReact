// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import userReducer, { appSlice } from "./appSlices";
// import { persistReducer, persistStore } from "redux-persist";

// const persistConfig = {
//   key: "storeToolkit",
//   version: 1,
//   storage,
// };

// const reducer = combineReducers({
//   userDetail: userReducer,
//   appFeature: appSlice.reducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer, { appSlice } from "./appSlices";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";

const persistConfig = {
  key: "storeToolkit",
  version: 1,
  storage,
};

const reducer = combineReducers({
  userDetail: userReducer,
  appFeature: appSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
