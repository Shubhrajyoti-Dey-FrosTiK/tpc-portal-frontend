"use client";

import React, { ReactElement } from "react";

// Components
import {
  Input,
  createStyles,
  NumberInput as NumberInputElement,
  ActionIcon,
} from "../../components";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { NumberInput as NumberInputType } from "../../../types/FormType";
import { FormBuilder } from "../../../types/Form";

// Icons
import { IconPlus, IconMinus } from "@tabler/icons";
import { useRef } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `6px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    border: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,

    "&:focus-within": {
      borderColor: theme.colors[theme.primaryColor][6],
    },
  },

  control: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,

    "&:disabled": {
      borderColor:
        theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: "transparent",
    },
  },

  input: {
    textAlign: "center",
    paddingRight: `${theme.spacing.sm}px !important`,
    paddingLeft: `${theme.spacing.sm}px !important`,
    height: 28,
    flex: 1,
  },
}));

function NumberInput({
  formElement,
  basePath,
  formKey,
  formBuilderSchema,
}: {
  formElement: NumberInputType;
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
  const { classes } = useStyles();

  console.log(formElement);

  return (
    <React.Fragment>
      {visible && (
        <div className="mt-3 mb-3">
          <NumberInputElement
            label={formElement.label}
            description={formElement.description}
            placeholder={formElement.placeHolder as string | undefined}
            precision={1}
            min={formElement.min || Number.MIN_VALUE}
            max={formElement.max || Number.MAX_VALUE}
            onKeyDown={() => {
              setKeyDown(true);
            }}
            onBlur={(e: React.FormEvent<HTMLInputElement>) => {
              setBlur(true);
              captureNumberInputChange(
                Number((e.target as HTMLInputElement).value)
              );
            }}
          />
          <Input.Error className="mt-1">{error}</Input.Error>
        </div>
      )}
    </React.Fragment>
  );
}

export default NumberInput;
