"use client";

import React, { ReactElement } from "react";

// Components
import { NumberInput as NumInput, Input } from "../../components";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { NumberInput } from "../../../types/FormType";
import { FormBuilder } from "../../../types/Form";

function NumberInput({
  formElement,
  basePath,
  formKey,
  formBuilderSchema,
}: {
  formElement: NumberInput;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
}): ReactElement {
  const {
    inputState,
    captureNumberInputChange,
    error,
    visible,
    setBlur,
    setKeyDown,
  } = useForm({
    formElement,
    basePath,
    formKey,
    formBuilderSchema,
  });

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
          <NumInput
            placeholder={
              (formElement.placeHolder as string) ||
              (formElement.label as string)
            }
            value={inputState || ""}
            onChange={captureNumberInputChange}
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

export default NumberInput;
