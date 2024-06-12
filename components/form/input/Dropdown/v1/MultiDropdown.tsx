"use client";

import { MultiSelect, SelectItem, Input } from "../../../../components";
import React, { useEffect, useState } from "react";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { FormBuilder } from "../../../types/Form";
import { MultiDropdownInput, Option } from "../../../types/FormType";
import {} from "@mantine/core";

export default function MultiDropdown({
  renderElement,
  formKey,
  formBuilderSchema,
  basePath,
}: {
  renderElement: MultiDropdownInput;
  formKey: string;
  formBuilderSchema: FormBuilder;
  basePath: string;
}) {
  const {
    error,
    visible,
    inputState,
    captureMultiDropdownInputChange,
    setBlur,
  } = useForm({
    formElement: renderElement,
    basePath,
    formKey,
    formBuilderSchema,
  });

  const [options, setOptions] = useState<SelectItem[]>([]);

  useEffect(() => {
    const newOptions: SelectItem[] = [];
    renderElement.options.forEach((option: Option) => {
      newOptions.push({
        label: option.label as string,
        value: option.key as string,
        description: option.description,
      });
    });
    setOptions(newOptions);
  }, []);

  return (
    <div>
      {visible && (
        <div className="mb-3 mt-3">
          <Input.Label
            className="font-bold"
            required={(renderElement.required as boolean) || false}
          >
            {renderElement.label}
          </Input.Label>
          <Input.Description>{renderElement.description}</Input.Description>
          <MultiSelect
            data={options}
            value={inputState}
            placeholder={renderElement.placeHolder as string}
            nothingFound="Nothing found"
            searchable
            maxDropdownHeight={200}
            creatable={
              renderElement.createable
                ? (renderElement.createable as boolean)
                : false
            }
            onChange={(input: string[]) => {
              captureMultiDropdownInputChange(input);
            }}
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setOptions((current) => [...current, item]);
              return item;
            }}
            error={error}
          />
        </div>
      )}
    </div>
  );
}
