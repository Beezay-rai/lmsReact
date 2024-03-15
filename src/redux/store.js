
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userReducer, { userSlicev2 } from "./userDetail";
import storage from "redux-persist/lib/storage";

import {
    persistReducer
} from "redux-persist"
import persistStore from "redux-persist/es/persistStore";

const persitConfig = {
    key: "storeTookit",
    version: 1,
    storage,
    timeout: 10,
}

const reducer = combineReducers({
    userDetail: userReducer,
    userDetailv2:userSlicev2.reducer
})

const persistedReducer = persistReducer(persitConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
   
});

const persistor = persistStore(store);
 export {persistor}