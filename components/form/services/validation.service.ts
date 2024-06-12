import { OutputBlockData } from "@editorjs/editorjs";
import { Failure, Success } from "../types/Form";
import {
  EditorV2BlockType,
  EditorV2Output,
  FormInputType,
  FormType,
} from "../types/FormType";
import { Validation } from "../types/Validation";

export default class ValidationService {
  isObject(item: any): Boolean {
    return typeof item === "object" && !Array.isArray(item) && item !== null;
  }

  isRequired(
    input:
      | string
      | number
      | Array<string>
      | Array<number>
      | OutputBlockData[]
      | EditorV2Output
      | undefined
      | null,
    formInputType: FormInputType
  ): Success | Failure {
    const error: Failure = {
      validationStatus: Validation.FAILURE,
      errorMessage: "This field is required",
    };
    const validated: Success = {
      validationStatus: Validation.SUCCESS,
    };
    let inputState = input;

    if (formInputType === FormInputType.CURRENCY && typeof input === "string") {
      inputState = input
        ? input.split(" ").length > 1
          ? input.split(" ")[1]
          : ""
        : "";
    }

    if (formInputType === FormInputType.SWITCH_INPUT && typeof input == "boolean") {
      return validated;
    }

    if (formInputType === FormInputType.EDITOR_V2_INPUT) {
      // @ts-ignore
      return input && input.internalState && input.internalState.length > 1
        ? validated
        : error;
    }

    if (formInputType === FormInputType.EDITOR_V3_INPUT) {
      return input && input != "" && input != "<p></p>" ? validated : error;
    }

    if (typeof inputState === "number") return validated;
    if (!inputState) return error;

    // @ts-ignore
    return inputState.length ? validated : error;
  }
}
