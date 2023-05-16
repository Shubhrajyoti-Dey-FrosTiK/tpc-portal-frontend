import { Failure, Success } from "../types/Form";
import { FormInputType, FormType } from "../types/FormType";
import { Validation } from "../types/Validation";

export default class ValidationService {
  isObject(item: any): Boolean {
    return typeof item === "object" && !Array.isArray(item) && item !== null;
  }

  isRequired(
    input: string | number | Array<string> | Array<number> | undefined | null,
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

    if (formInputType === FormInputType.CURRENCY && typeof input === "string")
      inputState = input
        ? input.split(" ").length > 1
          ? input.split(" ")[1]
          : ""
        : "";

    if (typeof inputState === "number") return validated;
    if (!inputState) return error;
    return inputState.length ? validated : error;
  }
}
