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
    addBooks: (state, action) => {
      state.places.push(action.payload);
    },
  },
});

export const { addBooks } = placesSlice.actions;
export default placesSlice.reducer;
