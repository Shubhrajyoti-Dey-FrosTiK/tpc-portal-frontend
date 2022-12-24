"use client";

import React, { ReactElement } from "react";

// Components
import { NumberInput as NumInput, Input } from "../../components";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { NumberInput } from "../../../types/FormType";

function NumberInput({
  formElement,
  basePath,
  formKey,
}: {
  formElement: NumberInput;
  basePath: string;
  formKey: string;
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
