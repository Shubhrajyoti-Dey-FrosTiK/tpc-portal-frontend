import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { User } from "firebase/auth";

// Define a type for the slice state
interface CurrentUser {
  currentUser: User | null;
}

export interface SetCurrentUser {
  user: User | null;
}

// Define the initial state using that type
const initialState: CurrentUser = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCurrentUser: (state, action: PayloadAction<SetCurrentUser>) => {
      state.currentUser = action.payload.user;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice;
