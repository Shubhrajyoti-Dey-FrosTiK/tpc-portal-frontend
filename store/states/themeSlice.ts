import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export enum Theme {
  "DARK" = "DARK",
  "LIGHT" = "LIGHT",
}

const initialState: {
  theme: Theme;
} = {
  theme: Theme.LIGHT,
};

export const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    toggleTheme: (state) => {
      if (state.theme === Theme.LIGHT) {
        state.theme = Theme.DARK;
      } else {
        state.theme = Theme.LIGHT;
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice;
