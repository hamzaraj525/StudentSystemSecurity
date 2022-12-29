import { createStore, applyMiddleware } from "redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "@reduxjs/toolkit";
import ParentReducer from "../Reducer/reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // blacklist: ['Status'],
};

const reducers = combineReducers({
  ParentReducer: persistReducer(persistConfig, ParentReducer),
});

// cart: cartSlice,

export const store = createStore(reducers);

export const persistor = persistStore(store);
export default store;
