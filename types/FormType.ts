import { Validation, Visible } from "./Form";

export enum FormType {
  SECTION = "SECTION",
  REPEATABLE_SECTION = "REPEATABLE_SECTION",
}

export enum FormInputType {
  SHORT_TEXT = "SHORT_TEXT",
  LONG_TEXT = "LONG_TEXT",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  FILE = "FILE",
  NUMBER = "NUMBER",
  CHIPBOX = "CHIPBOX",
}

export enum InputType {
  NUMBER = "NUMBER",
  EMAIL = "EMAIL",
}

export interface ShortText {
  label: String;
  key: String;
  type: FormInputType.SHORT_TEXT;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: String;
}

export interface LongText {
  label: String;
  key: String;
  type: FormInputType.LONG_TEXT;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: String;
}

export interface NumberInput {
  label: String;
  key: String;
  type: FormInputType.NUMBER;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: number;
}

export interface FileInput {
  label: String;
  key: String;
  type: FormInputType.FILE;
  required?: Boolean;
  visible?: Visible;
  description?: String;
  initialValue?: File | Array<File>;
}

export interface RadioInput {
  label: String;
  key: String;
  type: FormInputType.RADIO;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: String | number;
}

export interface CheckboxInput {
  label: String;
  key: String;
  type: FormInputType.CHECKBOX;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: Array<String | Number>;
}

export type FormElement =
  | ShortText
  | LongText
  | NumberInput
  | FileInput
  | RadioInput
  | CheckboxInput;
