import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  places: [],
};

// const fetchplacesById = createAsyncThunk(
//     "places/fetchplacesById",
//     async()
// )

export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlaces: (state, action) => {
      // state.places.push(action.payload);
      state.places = action.payload;
    },

    deletePlace: (state, action) => {
      state.places = state.places.filter(
        (place) => place._id !== action.payload
      );
    },
  },
});

export const { addPlaces, deletePlace } = placesSlice.actions;
export default placesSlice.reducer;
