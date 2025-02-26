import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as rootReducer from "../reducers";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    "loaderSlice",
  ], //NOTE - list of slices that will not store in persist
};
const persistedReducer = persistCombineReducers(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;