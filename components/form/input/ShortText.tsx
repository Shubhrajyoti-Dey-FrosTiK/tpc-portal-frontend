"use client";

import React, { ReactElement, Fragment, useState, useEffect } from "react";
import ValidationService from "../../../services/validation.service";

// Types
import { Failure, FormElement, Success } from "../../../types/Form";
import { Validation } from "../../../types/Validation";

// Components
import { TextInput, Input } from "../../components";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { selectForm, updateFormContext } from "../../../store/states/formSlice";

function ShortText({
  formElement,
  basePath,
  formKey,
}: {
  formElement: FormElement;
  basePath: string;
  formKey: string;
}): ReactElement {
  const dispatch = useDispatch();
  const ReduxFormContext = useSelector(selectForm);

  // Services
  const vs = new ValidationService();

  // State
  const [error, setError] = useState<String>("");
  const [blur, setBlur] = useState<Boolean>(false);
  const [keyDown, setKeyDown] = useState<Boolean>(false);
  const [visible, setVisible] = useState<Boolean>(true);

  // Initialize Key Value
  useEffect(() => {
    dispatch(
      updateFormContext({
        formKey,
        stateKey: basePath,
        value: (formElement.initialValue as string) || ("" as string),
      })
    );
  }, []);

  const populate = (propsList: Array<string>) => {
    let populateValues: Array<String> = [];
    propsList.forEach((prop) => {
      populateValues.push(ReduxFormContext[formKey]?.keyStore[prop]);
    });
    return populateValues;
  };

  // Validate
  useEffect(() => {
    const inputState = ReduxFormContext[formKey]?.keyStore[basePath];
    if (!keyDown && !blur) return;

    // Generic Required Validation
    if (
      formElement.required &&
      vs.isRequired(inputState).validationStatus === Validation.FAILURE
    ) {
      setError("This field is required");
      return;
    }

    if (!formElement.validation) return;
    let populateValues: Array<String> = populate(
      formElement.validation.props as Array<string>
    );

    let state: Success | Failure | undefined =
      formElement.validation?.validator(populateValues);
    setError(
      (state?.validationStatus == Validation.SUCCESS
        ? ""
        : state?.errorMessage) || ""
    );
  }, [keyDown, blur, ReduxFormContext[formKey]]);

  // Visibility
  useEffect(() => {
    if (!formElement.visible) return;
    let populateValues = populate(formElement.visible.props as Array<string>);
    let state: Boolean | undefined =
      formElement.visible?.validator(populateValues);
    setVisible(state || false);
  }, [ReduxFormContext[formKey]]);

  return (
    <React.Fragment>
      {visible && (
        <div className="mt-3 mb-3">
          <Input.Label
            className="font-bold"
            required={(formElement.required as boolean) || false}
          >
            {formElement.label}
          </Input.Label>
          <TextInput
            type={formElement.inputType || "text"}
            placeholder={
              (formElement.placeHolder as string) ||
              (formElement.label as string)
            }
            value={ReduxFormContext[formKey]?.keyStore[basePath] || ""}
            onChange={(e) => {
              dispatch(
                updateFormContext({
                  formKey,
                  stateKey: basePath,
                  value: e.target.value,
                })
              );
            }}
            error={error}
            description={formElement.description || ""}
            onKeyDown={() => {
              setKeyDown(true);
            }}
            onBlur={() => {
              setBlur(true);
            }}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default ShortText;
