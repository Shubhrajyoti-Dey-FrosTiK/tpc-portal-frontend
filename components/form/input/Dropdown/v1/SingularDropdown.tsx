"use client";

import { Select, SelectItem, Input } from "../../../../components";
import React, { useEffect, useState } from "react";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { FormBuilder } from "../../../types/Form";
import {
  Option,
  SingularDropdown as SingularDropdownInput,
} from "../../../types/FormType";
import {} from "@mantine/core";

export default function SingularDropdown({
  renderElement,
  formKey,
  formBuilderSchema,
  basePath,
}: {
  renderElement: SingularDropdownInput;
  formKey: string;
  formBuilderSchema: FormBuilder;
  basePath: string;
}) {
  const { error, visible, inputState, captureSingularDropdownInput, setBlur } =
    useForm({
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
          <Select
            data={options}
            value={inputState}
            placeholder={renderElement.placeHolder as string}
            nothingFound="Nothing found"
            searchable
            creatable={
              renderElement.createable
                ? (renderElement.createable as boolean)
                : false
            }
            onChange={(input: string) => {
              captureSingularDropdownInput(input);
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
