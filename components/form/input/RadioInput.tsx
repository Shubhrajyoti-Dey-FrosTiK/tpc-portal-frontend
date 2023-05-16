"use client";

import {
  UnstyledButton,
  Radio,
  Text,
  SimpleGrid,
  Typography,
  Input,
} from "../../components";
import React from "react";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { FormBuilder } from "../../../types/Form";
import { Option, RadioInput as RadioInputType } from "../../../types/FormType";
import { useStyles } from "./styles/useStyles";

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
}

export default function RadioInput({
  renderElement,
  formKey,
  formBuilderSchema,
  basePath,
}: {
  renderElement: RadioInputType;
  formKey: string;
  formBuilderSchema: FormBuilder;
  basePath: string;
}) {
  const { error, visible, inputState, captureRadioInput, setBlur } = useForm({
    formElement: renderElement,
    basePath,
    formKey,
    formBuilderSchema,
  });

  // Checkbox
  function RadioInputElement({
    title,
    description,
    className,
    option,
  }: ImageCheckboxProps & {
    option: Option;
    optionIndex: number;
  } & Omit<
      React.ComponentPropsWithoutRef<"button">,
      keyof ImageCheckboxProps
    >) {
    const { classes, cx } = useStyles({
      checked: inputState === option.key ? true : false,
    });

    const handleChange = async () => {
      captureRadioInput(option.key as string);
      setBlur(true);
    };

    return (
      <UnstyledButton
        onClick={handleChange}
        className={cx(classes.button, className)}
      >
        <Radio
          onChange={(e) => {}} // hack to shut error
          checked={inputState === option.key ? true : false}
          tabIndex={-1}
          // styles={{ input: { cursor: "pointer" } }}
        />
        <div className={classes.body}>
          <Typography weight={500} size="sm" sx={{ lineHeight: 1 }}>
            {title}
          </Typography>
          <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={5}>
            {description}
          </Text>
        </div>
      </UnstyledButton>
    );
  }

  return (
    <div>
      {visible && (
        <div className="mt-3 mb-3">
          <Input.Label
            className="font-bold"
            required={(renderElement.required as boolean) || false}
          >
            {renderElement.label}
          </Input.Label>
          <Input.Description>{renderElement.description}</Input.Description>
          <SimpleGrid
            cols={4}
            className="mt-1"
            breakpoints={[
              { maxWidth: "xl", cols: 4 },
              { maxWidth: "lg", cols: 3 },
              { maxWidth: "md", cols: 2 },
              { maxWidth: "xs", cols: 1 },
            ]}
          >
            {renderElement.options.map((option, optionIndex) => (
              <RadioInputElement
                option={option}
                optionIndex={optionIndex}
                title={option.label as string}
                description={(option.description as string) || ""}
                key={`Option-${optionIndex}-${option.key}` as React.Key}
              />
            ))}
          </SimpleGrid>
          <Input.Error className="mt-1">{error}</Input.Error>
        </div>
      )}
    </div>
  );
}
