"use client";

import React, { ReactElement } from "react";

// Components
import { TextInput, Input } from "../../components";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { ShortText } from "../../../types/FormType";
import { FormBuilder } from "../../../types/Form";

function ShortText({
  formElement,
  basePath,
  formKey,
  formBuilderSchema,
}: {
  formElement: ShortText;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
}): ReactElement {
  const {
    inputState,
    captureTextInputChange,
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
          <TextInput
            placeholder={
              (formElement.placeHolder as string) ||
              (formElement.label as string)
            }
            value={inputState || ""}
            onChange={captureTextInputChange}
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
