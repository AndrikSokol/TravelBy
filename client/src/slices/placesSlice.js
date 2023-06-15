import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, instance } from "../services/api";

const initialState = {
  places: [],
  isLoading : true,
  error:'',
};

 export const fetchPlaces= createAsyncThunk(
   "places",
     async(_,thunkAPI)=>{
      try {
        const {data} =  await api.getPlaces();
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
      
     }
 )

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
  extraReducers:{
    [fetchPlaces.fulfilled.type]:(state,action)=>{
      state.isLoading = false;
      state.places = action.payload;
    },
    [fetchPlaces.pending.type]:(state,action)=>{
      state.isLoading = true;
    },
    [fetchPlaces.rejected.type] :(state,action)=>{
      state.isLoading = false;
     state.error = action.error
    }
  }
  
});

export const { addPlaces, deletePlace } = placesSlice.actions;
export default placesSlice.reducer;
