"use client";

import React, { useState, useEffect } from "react";
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
} from "../states/formSlice";
import { EditorV2Output, FormElement, FormInputType } from "../types/FormType";
import { OutputBlockData } from "@editorjs/editorjs";
import useExportableFormData from "./useExportableFormData";
import { BlockNoteEditor } from "@blocknote/core";
import { getEditorV2InitialState } from "../lib/editorV2";
import FormService from "../services/form.service";

function useForm({
  formElement,
  basePath,
  formKey,
  formBuilderSchema,
  editorV2,
}: {
  formElement: FormElement;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
  editorV2?: BlockNoteEditor;
}) {
  const dispatch = useDispatch();
  const ReduxFormContext = useSelector(selectForm);
  const { getBasePathData } = useExportableFormData({ formKey });

  // Services
  const vs = new ValidationService();
  const fs = new FormService();

  // State
  const [error, setError] = useState<String>("");
  const [blur, setBlur] = useState<Boolean>(false);
  const [keyDown, setKeyDown] = useState<Boolean>(false);
  const [visible, setVisible] = useState<Boolean>(true);

  const initializeKeyStore = async () => {
    switch (formElement.type) {
      case FormInputType.CHECKBOX:
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as string[]) || [],
            formBuilderSchema,
          })
        );
        break;

      case FormInputType.MULTI_DROPDOWN:
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as string[]) || [],
            formBuilderSchema,
          })
        );
        break;

      case FormInputType.EDITOR_INPUT:
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: formElement.initialValue || [],
            formBuilderSchema,
          })
        );
        break;

      case FormInputType.EDITOR_V2_INPUT: {
        let editorV2State: EditorV2Output | undefined =
          await getEditorV2InitialState(editorV2!, formElement);

        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: editorV2State,
            formBuilderSchema,
          })
        );
        break;
      }

      case FormInputType.EDITOR_V3_INPUT: {
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as string) || "",
            formBuilderSchema,
          })
        );
        break;
      }

      // For currency we need to concat the currency and the value for initial value
      case FormInputType.CURRENCY:
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
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: [],
            formBuilderSchema,
          })
        );

      case FormInputType.NUMBER:
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as number) || 0,
            formBuilderSchema,
          })
        );

      case FormInputType.DATE_TIME:
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as string) || "",
            formBuilderSchema,
          })
        );
        break;

      case FormInputType.SWITCH_INPUT:
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
        dispatch(
          updateFormStateContext({
            formKey,
            stateKey: basePath,
            value: (formElement.initialValue as string) || ("" as string),
            formBuilderSchema,
          })
        );
    }
  };

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

    // Initialize KeyStore
    initializeKeyStore();

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

  const populate = async (propsList: Array<any>) => {
    let populateValues: Array<any> = [];
    propsList.forEach(async (prop) => {
      if (prop === "SELF")
        populateValues.push(ReduxFormContext[formKey]?.keyStore[basePath]);
      else if (prop.includes("OUTER_NUTSHELL")) {
        let layer = 1;
        const propArray = prop.split("_");
        if (propArray.length > 2) {
          layer = Number(propArray[2]);
        }
        populateValues.push(getBasePathData(basePath, layer));
      } else populateValues.push(ReduxFormContext[formKey]?.keyStore[prop]);
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

  const captureEditorInputChange = async (
    value: Array<OutputBlockData>
  ): Promise<Array<OutputBlockData>> => {
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

  const captureSingularDropdownInput = async (
    input: string
  ): Promise<string> => {
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

  const captureMultiDropdownInputChange = async (
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

  const captureDateTimeInputChange = async (input: string): Promise<string> => {
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

  const captureEditorV2InputChange = async (
    input: EditorV2Output
  ): Promise<EditorV2Output> => {
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

  const captureEditorV3InputChange = async (html: string): Promise<string> => {
    dispatch(
      updateFormStateContext({
        formKey,
        stateKey: basePath,
        value: html,
        formBuilderSchema,
      })
    );
    return html;
  };

  const captureSwitchInputChange = async (state: boolean): Promise<boolean> => {
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
    captureEditorV2InputChange,
    captureFileInputChange,
    captureSingularDropdownInput,
    captureDateTimeInputChange,
    captureMultiDropdownInputChange,
    captureEditorInputChange,
    captureEditorV3InputChange,
    captureSwitchInputChange,
  };
}

export default useForm;
