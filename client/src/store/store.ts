import { combineReducers, configureStore } from "@reduxjs/toolkit";
import placesSlice from "../slices/placesSlice";
import userSlice from "../slices/userSlice";
import { travelByApi } from "./api/api";

const rootReducer = combineReducers({
  place: placesSlice,
  user: userSlice,
  [travelByApi.reducerPath]: travelByApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(travelByApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
