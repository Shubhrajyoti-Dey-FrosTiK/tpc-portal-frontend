import React from "react";
import useForm from "../../../hooks/useForm";
import { FormBuilder } from "../../../types/Form";
import { Switch as SwitchType } from "../../../types/FormType";
import { Switch as SwitchComponent } from "../../../../components";

function Switch({
  formElement,
  basePath,
  formKey,
  formBuilderSchema,
}: {
  formElement: SwitchType;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
}) {
  const {
    inputState,
    captureSwitchInputChange,
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
    <div>
      {visible && (
        <div className="mb-3 mt-3">
          <SwitchComponent
            label={formElement.label}
            description={formElement.description}
            error={error}
            checked={inputState}
            onChange={(e) => captureSwitchInputChange(e.currentTarget.checked)}
            defaultChecked={formElement.initialValue as boolean || false}
          />
        </div>
      )}
    </div>
  );
}

export default Switch;
