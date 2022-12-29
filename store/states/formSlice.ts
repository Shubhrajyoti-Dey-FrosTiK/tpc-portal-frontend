import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Types
import { FormBuilder, FormState as FormStateType } from "../../types/Form";
import FormService from "../../services/form.service";

// Define a type for the slice state
interface FormState {
  [key: string]: FormStateType;
}

export interface UpdateReduxFormState {
  formKey: string;
  stateKey: string;
  formBuilderSchema: FormBuilder;
  value?: string | Array<string> | number | Array<number>;
}

export interface UpdateReduxFormValidation {
  formKey: string;
  stateKey: string;
  formBuilderSchema: FormBuilder;
  value?: boolean;
}

export interface InitializeReduxFormState {
  formKey: string;
  formBuilderSchema: FormBuilder;
}

export interface UpdateRepeatingSection {
  formKey: string;
  keyIndices: Array<number>;
  initialSchema: FormBuilder;
}

export interface RemoveRepeatingSection extends UpdateRepeatingSection {
  basePath: string;
  formKey: string;
  indexToRemove: number;
  repeatingSectionLen: number;
}

// Define the initial state using that type
const initialState: FormState = {};

const FS = new FormService();

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
          validationStore: {},
          formBuilderSchema: action.payload.formBuilderSchema,
        };
    },

    updateFormStateContext: (
      state,
      action: PayloadAction<UpdateReduxFormState>
    ) => {
      if (!state[action.payload.formKey])
        state[action.payload.formKey] = {
          keyStore: {},
          validationStore: {},
          formBuilderSchema: action.payload.formBuilderSchema,
        };
      state[action.payload.formKey].keyStore[action.payload.stateKey] =
        action.payload.value || "";
    },

    updateFormValidationContext: (
      state,
      action: PayloadAction<UpdateReduxFormValidation>
    ) => {
      if (!state[action.payload.formKey])
        state[action.payload.formKey] = {
          keyStore: {},
          validationStore: {},
          formBuilderSchema: action.payload.formBuilderSchema,
        };
      state[action.payload.formKey].validationStore[action.payload.stateKey] =
        action.payload.value || false;
    },

    updateRepeatingSection: (
      state,
      action: PayloadAction<UpdateRepeatingSection>
    ) => {
      FS.recursiveEditor(
        state[action.payload.formKey].formBuilderSchema.sections,
        action.payload.initialSchema.sections,
        action.payload.keyIndices,
        0
      );
    },

    removeRepeatingSection: (
      state,
      action: PayloadAction<RemoveRepeatingSection>
    ) => {
      FS.removeRepeatingSection(
        state[action.payload.formKey].keyStore,
        state[action.payload.formKey].validationStore,
        action.payload.basePath,
        action.payload.indexToRemove,
        action.payload.repeatingSectionLen,
        state[action.payload.formKey].formBuilderSchema.sections,
        action.payload.initialSchema.sections,
        action.payload.keyIndices,
        0
      );
    },
  },
});

export const {
  initializeFormState,
  updateFormStateContext,
  updateFormValidationContext,
  updateRepeatingSection,
  removeRepeatingSection,
} = formSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectForm = (state: RootState) => state.form;

export default formSlice;
