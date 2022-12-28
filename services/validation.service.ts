import { Failure, Success } from "../types/Form";
import { Validation } from "../types/Validation";

export default class ValidationService {
  isObject(item: any): Boolean {
    return typeof item === "object" && !Array.isArray(item) && item !== null;
  }

  isRequired(
    input: string | number | Array<string> | Array<number> | undefined | null
  ): Success | Failure {
    const error: Failure = {
      validationStatus: Validation.FAILURE,
      errorMessage: "This field is required",
    };
    const validated: Success = {
      validationStatus: Validation.SUCCESS,
    };
    if (typeof input === "number") return validated;
    if (!input) return error;
    return input.length ? validated : error;
  }
}
