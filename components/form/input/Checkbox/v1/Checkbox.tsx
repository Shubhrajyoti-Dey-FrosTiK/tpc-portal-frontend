"use client";

import {
  UnstyledButton,
  Checkbox,
  Text,
  SimpleGrid,
  Typography,
  Input,
} from "../../../../components";
import React from "react";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { FormBuilder } from "../../../types/Form";
import {
  CheckboxInput as CheckboxInputType,
  Option,
} from "../../../types/FormType";
import { useStyles } from "../../styles/useStyles";

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
}

export default function CheckboxInput({
  renderElement,
  formKey,
  formBuilderSchema,
  basePath,
}: {
  renderElement: CheckboxInputType;
  formKey: string;
  formBuilderSchema: FormBuilder;
  basePath: string;
}) {
  const { error, visible, inputState, captureCheckboxInputChange, setBlur } =
    useForm({
      formElement: renderElement,
      basePath,
      formKey,
      formBuilderSchema,
    });

  // Checkbox
  function CheckboxElement({
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
    setBlur(true);

    const check = (): boolean => {
      if (!inputState) return false;
      if (option.value) {
        const inputStateObj: { [key: string]: boolean } = {};
        inputState.forEach((input: string) => {
          inputStateObj[input] = true;
        });
        let found: boolean = true;
        for (let i = 0; i < option.value.length; i++) {
          if (!inputStateObj[option.value[i] as string]) {
            found = false;
            break;
          }
        }

        // Syncing with the state and the backend
        if (!found && inputState.includes(option.key)) {
          const newInputState = [...inputState];
          const index = newInputState.indexOf(option.key);
          if (index > -1) {
            newInputState.splice(index, 1);
          }
          captureCheckboxInputChange(newInputState);
        } else if (found && !inputState.includes(option.key)) {
          captureCheckboxInputChange([...inputState, option.key]);
        }
        return found;
      } else {
        return inputState.includes(option.key) ? true : false;
      }
    };

    const { classes, cx } = useStyles({
      checked: check(),
    });

    const handleChange = () => {
      if (option.value) {
        if (inputState.includes(option.key)) {
          // If the Option is not selected
          const valueObj: { [key: string]: boolean } = {
            [option.key as string]: true,
          };
          option.value.forEach((value: String) => {
            valueObj[value as string] = true;
          });
          const newInputState: Array<string> = [];
          inputState.forEach((input: string) => {
            if (!valueObj[input]) newInputState.push(input);
          });
          captureCheckboxInputChange(newInputState as string[]);
        } else {
          // If Option is already Checked
          const inputStateObj: { [key: string]: boolean } = {};
          inputState.forEach((input: string) => {
            inputStateObj[input] = true;
          });
          const newInputState = [...inputState, option.key];
          option.value.forEach((optionValue) => {
            if (!inputStateObj[optionValue as string])
              newInputState.push(optionValue);
          });
          captureCheckboxInputChange(newInputState);
        }
      } else {
        const newInputState = [...inputState];
        const index = newInputState.indexOf(option.key);
        if (index > -1) {
          newInputState.splice(index, 1);
        } else {
          newInputState.push(option.key);
        }
        captureCheckboxInputChange(newInputState);
      }
    };

    return (
      <UnstyledButton
        onClick={handleChange}
        className={cx(classes.button, className)}
      >
        <Checkbox
          onChange={() => {}} // hack to shut error
          checked={check()}
          tabIndex={-1}
          styles={{ input: { cursor: "pointer" } }}
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
        <div className="mb-3 mt-3">
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
              <CheckboxElement
                option={option}
                optionIndex={optionIndex}
                title={option.label as string}
                description={(option.description as string) || ""}
                key={option.key as React.Key}
              />
            ))}
          </SimpleGrid>
          <Input.Error className="mt-1">{error}</Input.Error>
        </div>
      )}
    </div>
  );
}
