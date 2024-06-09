"use client";

import React, { ReactElement, Fragment, useState, useEffect } from "react";
import ValidationService from "../services/validation.service";

// Types
import { Failure, FormBuilder, Success } from "../types/Form";
import { Validation } from "../types/Validation";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectForm,
  updateFormStateContext,
  updateFormValidationContext,
} from "../store/states/formSlice";
import { FormElement, FormInputType, FormType } from "../types/FormType";

function useForm({
  formElement,
  basePath,
  formKey,
  formBuilderSchema,
}: {
  formElement: FormElement;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
}) {
  const dispatch = useDispatch();
  const ReduxFormContext = useSelector(selectForm);

  // Services
  const vs = new ValidationService();

  // State
  const [error, setError] = useState<String>("");
  const [blur, setBlur] = useState<Boolean>(false);
  const [keyDown, setKeyDown] = useState<Boolean>(false);
  const [visible, setVisible] = useState<Boolean>(true);

  // Initialize Key Value and Validation
  useEffect(() => {
    // If value already exists in KeyStore then just skip this step
    if (
      vs.isRequired(
        ReduxFormContext[formKey].keyStore[basePath],
        formElement.type
      ).validationStatus === Validation.SUCCESS
    ) {
      return;
    }

    switch (formElement.type) {
      case FormInputType.CHECKBOX:
        console.log("1")
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as string[]) || [],
            formBuilderSchema,
          })
        );
        break;

      // For currency we need to concat the currency and the value for initial value
      case FormInputType.CURRENCY:
        console.log("2")
        let currencyValue = "INR";
        if (formElement.initialValue)
          currencyValue =
            formElement.initialValue.currency + formElement.initialValue.value;
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: currencyValue,
            formBuilderSchema,
          })
        );
        break;

      case FormInputType.FILE:
        console.log("3")
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: [],
            formBuilderSchema,
          })
        );
        break;

      case FormInputType.NUMBER:
        console.log("4")
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as number) || 0,
            formBuilderSchema,
          })
        );
        break;

      case FormInputType.SWITCH_INPUT:
        console.log("5")
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as boolean) || false,
            formBuilderSchema,
          })
        );
        break;

      default:
        console.log("6")
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as string) || ("" as string),
            formBuilderSchema,
          })
        );
    }

    // Updating the Validation state
    dispatch(
      updateFormValidationContext({
        formKey,
        stateKey: basePath,
        value:
          formElement.type !== FormInputType.FILE &&
            (formElement.required || formElement.validation)
            ? false
            : true,
        formBuilderSchema,
      })
    );
  }, []);

  const populate = async (propsList: Array<string>) => {
    let populateValues: Array<String> = [];
    propsList.forEach((prop) => {
      if (prop === "SELF")
        populateValues.push(ReduxFormContext[formKey]?.keyStore[basePath]);
      else populateValues.push(ReduxFormContext[formKey]?.keyStore[prop]);
    });
    return populateValues;
  };

  // Validate async
  const validate = async () => {
    const inputState = ReduxFormContext[formKey]?.keyStore[basePath];
    if (!ReduxFormContext[formKey]?.submitTried && !keyDown && !blur) return;

    let finalValidatedState: boolean = true;

    // Generic Required Validation
    if (
      formElement.required &&
      vs.isRequired(inputState, formElement.type).validationStatus ===
      Validation.FAILURE
    ) {
      finalValidatedState = false;
      setError("This field is required");
    } else {
      setError("");
      finalValidatedState = true;
      if (formElement.type !== FormInputType.FILE && formElement.validation) {
        let populateValues: Array<String> = await populate(
          formElement.validation.props as Array<string>
        );

        let state: Success | Failure | undefined =
          formElement.validation?.validator(populateValues);
        setError(
          (state?.validationStatus == Validation.SUCCESS
            ? ""
            : state?.errorMessage) || ""
        );
        if (state?.validationStatus == Validation.FAILURE)
          finalValidatedState = false;
      }
    }

    // Update the validation Status on validation Store
    dispatch(
      updateFormValidationContext({
        formKey,
        stateKey: basePath,
        value: finalValidatedState,
        formBuilderSchema,
      })
    );
  };

  // Validate & Visibility
  useEffect(() => {
    validate();
    visibility();
  }, [
    keyDown,
    blur,
    ReduxFormContext[formKey],
    ReduxFormContext[formKey]?.submitTried,
  ]);

  // Check visibile async
  const visibility = async () => {
    if (!formElement.visible) return;
    let populateValues = await populate(
      formElement.visible.props as Array<string>
    );
    let state: Boolean | undefined =
      formElement.visible?.validator(populateValues);
    setVisible(state || false);
  };

  const captureTextInputChange = async (
    e: React.SyntheticEvent
  ): Promise<string> => {
    const target = e.target as HTMLInputElement;
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value: target.value,
        formBuilderSchema,
      })
    );
    return target.value;
  };

  const captureNumberInputChange = async (
    value: number | undefined
  ): Promise<number | undefined> => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value,
        formBuilderSchema,
      })
    );
    return value;
  };

  const captureCurrencyInputChange = async (value: string): Promise<string> => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value,
        formBuilderSchema,
      })
    );
    return value;
  };

  const captureCheckboxInputChange = async (
    value: Array<string>
  ): Promise<Array<string>> => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value,
        formBuilderSchema,
      })
    );
    return value;
  };

  const captureRadioInput = async (input: string): Promise<string> => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value: input,
        formBuilderSchema,
      })
    );
    return input;
  };

  const captureFileInputChange = async (
    input: Array<File>
  ): Promise<Array<File>> => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value: input ? input : 0,
        formBuilderSchema,
      })
    );
    return input;
  };

  const captureSwitchInputChange = async (state: boolean): Promise<boolean> => {
    console.log("Inside Switch Input Change ", state)
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value: state,
        formBuilderSchema,
      })
    );
    return state;
  };

  return {
    inputState: ReduxFormContext[formKey]?.keyStore[basePath],
    captureCheckboxInputChange,
    captureTextInputChange,
    captureNumberInputChange,
    error,
    visible,
    blur,
    setBlur,
    keyDown,
    setKeyDown,
    captureRadioInput,
    captureCurrencyInputChange,
    captureFileInputChange,
    captureSwitchInputChange,
  };
}

export default useForm;
