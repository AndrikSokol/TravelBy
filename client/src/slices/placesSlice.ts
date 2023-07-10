import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, instance } from "../services/api";
import { IPlaceData } from "../types/place.interface";

interface placesState {
  places: IPlaceData[];
  placesForUser: IPlaceData[];
  isLoading: boolean;
  error: string;
}
const initialState: placesState = {
  places: [],
  placesForUser: [],
  isLoading: false,
  error: "",
};

export const fetchPlaces = createAsyncThunk("places", async (_, thunkAPI) => {
  try {
    const data = await api.getPlaces();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchPlacesForUser = createAsyncThunk(
  "placesForUser",
  async (_, thunkAPI) => {
    try {
      const data = await api.getPlacesForUser();
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlaces: (state, action) => {
      state.placesForUser = action.payload;
    },

    deletePlace: (state, action) => {
      state.placesForUser = state.placesForUser.filter(
        (place) => place._id !== action.payload
      );
    },

    deletePlacesForUser: (state) => {
      state.placesForUser = [];
    },
  },
  extraReducers: {
    [fetchPlaces.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.places = action.payload;
    },
    [fetchPlaces.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchPlaces.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    [fetchPlacesForUser.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.placesForUser = action.payload;
    },
    [fetchPlacesForUser.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchPlacesForUser.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const { addPlaces, deletePlace, deletePlacesForUser } =
  placesSlice.actions;
export default placesSlice.reducer;
