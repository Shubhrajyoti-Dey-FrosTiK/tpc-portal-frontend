import { OutputBlockData } from "@editorjs/editorjs";
import {
  EditorV2BlockType,
  EditorV2Output,
  FormElement,
  FormInputType,
  FormType,
  InputType,
} from "./FormType";
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
  validator(arg0: Array<any>): Boolean;
}

export interface StoragePath {
  prop: String;
  path(arg0: String): string;
}

export type Section = {
  formElements: Array<FormElement | Section | RepeatableSection>;
  key: String;
  type: FormType.SECTION;
  title?: String;
  description?: String;
  validation?: Validation;
  visible?: Visible;
};

export interface RepeatableSection {
  formElements: Array<Array<FormElement | Section | RepeatableSection>>;
  key: String;
  type: FormType.REPEATABLE_SECTION;
  title?: String;
  validation?: Validation;
  description?: String;
  visible?: Visible;
  addElementText?: String;
  repeatSectionHeading?: String;
  headerOverride?: boolean;
}

export interface FormBuilder {
  title: String;
  key: String;
  sections: Array<Section | RepeatableSection | FormElement>;
  description?: String;
}

// ----------------- Form State -----------------

export interface KeyStore {
  [key: string]:
    | string
    | number
    | boolean
    | Array<string>
    | Array<number>
    | Array<File>
    | OutputBlockData[]
    | EditorV2Output;
}

export interface RepeatStore {
  [key: string]: number;
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

export interface Sandbox {
  keyStore?: KeyStore;
  exportData?: ExportableFormState;
  submitted: boolean;
}

export interface FormState {
  keyStore: KeyStore;
  repeatStore: RepeatStore;
  formBuilderSchema: FormBuilder;
  validationStore: ValidationStore;
  submitTried: boolean;
  posted: boolean;
  sandbox: Sandbox;
}

export interface ExportableFormState {
  [key: string]:
    | string
    | number
    | Array<File>
    | Array<string>
    | Array<number>
    | ExportableFormState
    | Array<ExportableFormState>
    | OutputBlockData[]
    | EditorV2BlockType;
}
