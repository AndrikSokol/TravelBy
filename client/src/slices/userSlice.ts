import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/user.interface";

interface IUserState {
  user: IUser | null;
  setAuth: boolean;
}
const initialState: IUserState = {
  user: null,
  setAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.setAuth = true;
    },

    deleteUser: (state) => {
      state.user = null;
      state.setAuth = false;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
