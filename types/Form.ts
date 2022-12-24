import { FormElement, FormInputType, FormType, InputType } from "./FormType";
import { Validation as ValidationType } from "./Validation";

// --------------- Form Builder -----------

export interface Success {
  validationStatus: ValidationType.SUCCESS;
}

export interface Failure {
  validationStatus: ValidationType.FAILURE;
  errorMessage: String;
}

export interface Validation {
  props: Array<String>;
  validator(arg0: Array<String>): Success | Failure;
}

export interface Visible {
  props: Array<String>;
  validator(arg0: Array<String>): Boolean;
}

export type Section = {
  formElements: Array<FormElement | Section>;
  key: String;
  type: FormType;
  Typography?: String;
  validation?: Validation;
  visible?: Visible;
};

export interface FormBuilder {
  Typography: String;
  key: String;
  sections: Array<Section | FormElement>;
  description?: String;
}

// ----------------- Form State -----------------

export interface KeyStore {
  [key: string]: string | number | Array<string> | Array<number>;
}

export interface ValidationStore {
  [key: string]: boolean;
}

export interface FormElementState {
  [value: string]:
    | FormElementState
    | string // text input
    | number // text input of type number
    | boolean // Toggle
    | Array<string> // Checkbox
    | Array<number>; // Checkbox + numbers
}

export interface FormState {
  keyStore: KeyStore;
  validationStore: ValidationStore;
  data?: FormElementState;
}
