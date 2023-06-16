import { combineReducers, configureStore } from "@reduxjs/toolkit";
import placesSlice from "../slices/placesSlice";

const rootReducer = combineReducers({
  place: placesSlice,
})

export const setupStore = ()=> {return configureStore({
  reducer: rootReducer
})}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']