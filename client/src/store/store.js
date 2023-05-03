import { configureStore } from "@reduxjs/toolkit";
import placesSlice from "../slices/placesSlice";

export const store = configureStore({
  reducer: {
    place: placesSlice,
  },
});
