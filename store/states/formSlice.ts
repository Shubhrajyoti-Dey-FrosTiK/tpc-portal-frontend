import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Types
import { FormState as FormStateType } from "../../types/Form";

// Define a type for the slice state
interface FormState {
  [key: string]: FormStateType;
}

export interface UpdateReduxFormState {
  formKey: string;
  stateKey: string;
  value?: string;
}

export interface InitializeReduxFormState {
  formKey: string;
}

// Define the initial state using that type
const initialState: FormState = {};

export const formSlice = createSlice({
  name: "form",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    initializeFormState: (
      state,
      action: PayloadAction<InitializeReduxFormState>
    ) => {
      if (!state[action.payload.formKey])
        state[action.payload.formKey] = {
          keyStore: {},
        };
    },

    updateFormContext: (state, action: PayloadAction<UpdateReduxFormState>) => {
      if (!state[action.payload.formKey])
        state[action.payload.formKey] = { keyStore: {} };
      state[action.payload.formKey].keyStore[action.payload.stateKey] =
        action.payload.value || "";
    },
  },
});

export const { initializeFormState, updateFormContext } = formSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectForm = (state: RootState) => state.form;

export default formSlice;
