import {
  Block,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import { OutputBlockData } from "@editorjs/editorjs";
import { Currency } from "./CurrencyTypes";
import { StoragePath, Validation, Visible } from "./Form";

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
  CURRENCY = "CURRENCY",
  PASSWORD_CREATION = "PASSWORD_CREATION",
  SINGULAR_DROPDOWN = "SINGULAR_DROPDOWN",
  DATE_TIME = "DATE_TIME",
  MULTI_DROPDOWN = "MULTI_DROPDOWN",
  EDITOR_INPUT = "EDITOR_INPUT",
  EDITOR_V2_INPUT = "EDITOR_V2_INPUT",
  EDITOR_V3_INPUT = "EDITOR_V3_INPUT",
  SWITCH_INPUT = "SWITCH_INPUT",
}

export enum InputType {
  NUMBER = "NUMBER",
  EMAIL = "EMAIL",
}

export enum EditorV2OutputType {
  BLOCK = "BLOCK",
  HTML = "HTML",
  MARKDOWN = "MARKDOWN",
}

export interface ShortText {
  label: String;
  key: String;
  type: FormInputType.SHORT_TEXT | FormInputType.PASSWORD_CREATION;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: String;
}

export interface Switch {
  label: String;
  key: String;
  type: FormInputType.SWITCH_INPUT;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  id?: String;
  description?: String;
  initialValue?: Boolean;
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

export interface EditorInput {
  label: String;
  key: String;
  type: FormInputType.EDITOR_INPUT;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  id?: String;
  description?: String;
  initialValue?: OutputBlockData[];
}

export interface EditorV2Input {
  label: String;
  key: String;
  type: FormInputType.EDITOR_V2_INPUT;
  output: EditorV2OutputType;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  id?: String;
  description?: String;
  initialValue?: EditorV2Output;
}

export interface EditorV3Input {
  label: String;
  key: String;
  type: FormInputType.EDITOR_V3_INPUT;
  placeholder?: String;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
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
  min?: number;
  max?: number;
  precision?: number;
  step?: number; // the steps or skips by which value will increase if up and down buttons are pressed
}

export interface FileInput {
  label: String;
  key: String;
  type: FormInputType.FILE;
  storagePath: StoragePath;
  required?: Boolean;
  visible?: Visible;
  description?: String;
  initialValue?: Array<File>;
}

// -------------------- Radio ----------------- //

export interface RadioInput {
  label: String;
  key: String;
  type: FormInputType.RADIO;
  options: Array<Option>;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: String | number;
}

// -------------------- Singular Dropdown ----------------- //

export interface SingularDropdown {
  label: String;
  key: String;
  type: FormInputType.SINGULAR_DROPDOWN;
  options: Array<Option>;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: String | number;
  createable?: Boolean;
}

//  -------------- Checkbox -----------------//

export interface CheckboxInput {
  label: String;
  key: String;
  type: FormInputType.CHECKBOX;
  options: Array<Option>;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: Array<String> | Array<Number>;
}

//  -------------- Multidropdown -----------------//

export interface MultiDropdownInput {
  label: String;
  key: String;
  type: FormInputType.MULTI_DROPDOWN;
  options: Array<Option>;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  createable?: Boolean;
  description?: String;
  initialValue?: Array<String> | Array<Number>;
}

export interface Option {
  label: String;
  key: String;
  value?: Array<String>;
  description?: String;
}

export interface CurrencyInput {
  label: String;
  key: String;
  type: FormInputType.CURRENCY;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  defaultCurrency?: Currency;
  placeHolder?: String;
  id?: String;
  description?: String;
  initialValue?: {
    currency: Currency;
    value: number;
  };
}

export interface DateTimeInput {
  label: String;
  key: String;
  type: FormInputType.DATE_TIME;
  required?: Boolean;
  validation?: Validation;
  visible?: Visible;
  placeHolder?: String;
  id?: String;
  description?: String;
  showTime?: boolean;
  // needs to be "YYYY-MM-DD" or "YYYY-MM-DD HH:mm" format or ISO 8601 Compliant
  initialValue?: String;
  minDate?: String;
  maxDate?: String;
}

export type FormElement =
  | ShortText
  | LongText
  | NumberInput
  | FileInput
  | RadioInput
  | CheckboxInput
  | CurrencyInput
  | SingularDropdown
  | DateTimeInput
  | MultiDropdownInput
  | EditorInput
  | EditorV2Input
  | EditorV3Input
  | Switch;

/* -------- Outputs -------- */

export type EditorV2BlockType = Block<
  BlockSchema,
  InlineContentSchema,
  StyleSchema
>[];

export interface EditorV2BlockOutput {
  type: EditorV2OutputType.BLOCK;
  content: EditorV2BlockType;
  html?: string;
  internalState?: EditorV2BlockType;
}

export interface EditorV2HTMLOutput {
  type: EditorV2OutputType.HTML;
  content: string;
  html?: string;
  internalState?: EditorV2BlockType;
}

export interface EditorV2MarkdownOutput {
  type: EditorV2OutputType.MARKDOWN;
  content: string;
  html?: string;
  internalState?: EditorV2BlockType;
}

export type EditorV2Output =
  | EditorV2BlockOutput
  | EditorV2HTMLOutput
  | EditorV2MarkdownOutput;
