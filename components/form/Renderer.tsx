"use client";

import { IconFileX } from "@tabler/icons";
import dynamic from "next/dynamic";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BOX_SHADOW } from "../../constants/boxShadow";
import {
  removeRepeatingSection,
  selectForm,
  updateRepeatingSection,
} from "../../store/states/formSlice";

// Types
import { FormBuilder, RepeatableSection, Section } from "../../types/Form";
import {
  FormType,
  FormElement,
  FormInputType,
  Option,
} from "../../types/FormType";
import { Button, Input, Text, Typography, Paper } from "../components";

// Components
// const ShortText = dynamic(import("./input/ShortText"));
// const LongText = dynamic(import("./input/LongText"));
// const NumberInput = dynamic(import("./input/NumberInput"));
// const RadioInput = dynamic(import("./input/RadioInput"));
// const CurrencyInput = dynamic(import("./input/CurrencyInput"));
// const CheckboxInput = dynamic(import("./input/Checkbox"));
// const FileInput = dynamic(import("./input/FileInput"));
// const PasswordCreation = dynamic(import("./input/PasswordCreation"));

import ShortText from "./input/ShortText";
import LongText from "./input/LongText";
import NumberInput from "./input/NumberInput";
import RadioInput from "./input/RadioInput";
import CurrencyInput from "./input/CurrencyInput";
import CheckboxInput from "./input/Checkbox";
import FileInput from "./input/FileInput";
import PasswordCreation from "./input/PasswordCreation";

function Renderer({
  renderElement,
  basePath,
  formKey,
  formBuilderSchema,
  keyIndex,
  initialSchema,
  viewOnly,
}: {
  renderElement: Section | FormElement | RepeatableSection;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
  keyIndex: Array<number>;
  initialSchema: FormBuilder;
  viewOnly?: Boolean;
}): React.ReactElement {
  const dispatch = useDispatch();
  const ReduxFormContext = useSelector(selectForm);

  const populate = (propsList: Array<string>) => {
    let populateValues: Array<String> = [];
    propsList.forEach((prop) => {
      if (prop === "SELF")
        populateValues.push(ReduxFormContext[formKey]?.keyStore[basePath]);
      else populateValues.push(ReduxFormContext[formKey]?.keyStore[prop]);
    });
    return populateValues;
  };

  const addRepeatingSection = () => {
    dispatch(
      updateRepeatingSection({
        formKey,
        keyIndices: keyIndex,
        initialSchema,
        basePath,
      })
    );
  };

  const deleteRepeatingSection = (
    indexToRemove: number,
    repeatingSectionLen: number
  ) => {
    dispatch(
      removeRepeatingSection({
        formKey,
        basePath: `${basePath}[${renderElement.key}]-(`,
        indexToRemove,
        repeatStorePath: `${basePath}`,
        repeatingSectionLen,
        keyIndices: keyIndex,
        initialSchema,
      })
    );
  };

  const Viewer = (): React.ReactElement => {
    const newBasePath = `${basePath}[${renderElement.key}]`;

    switch (renderElement.type) {
      case FormInputType.FILE: {
        // To tackle URL of files (VIEWER)
        if (typeof ReduxFormContext[formKey].keyStore[newBasePath] === "string")
          return (
            <Typography order={5} className="font-light">
              ReduxFormContext[formKey].keyStore[newBasePath]
            </Typography>
          );
        // To show the box for file
        else
          return (
            <div>
              {ReduxFormContext[formKey].keyStore[newBasePath] ? (
                <div>
                  {ReduxFormContext[formKey].keyStore[newBasePath].map(
                    (file: File, fileIndex: number) => {
                      return (
                        <Paper
                          key={`${renderElement.label}_${fileIndex}`}
                          shadow="sm"
                          p="sm"
                          className="flex justify-between mt-3"
                          withBorder
                        >
                          <div className="flex gap-2 items-center">
                            <IconFileX size={30} />
                            <Text>{file.name}</Text>
                          </div>
                        </Paper>
                      );
                    }
                  )}
                </div>
              ) : (
                "-"
              )}
            </div>
          );
      }

      case FormInputType.CHECKBOX: {
        const optionKeysSelected =
          ReduxFormContext[formKey].keyStore[newBasePath];
        const allOptions = renderElement.options;
        const labels: Array<String> = [];
        optionKeysSelected.forEach((option: string) => {
          for (
            let optionIndex = 0;
            optionIndex < allOptions.length;
            optionIndex++
          ) {
            if (allOptions[optionIndex].key == option) {
              labels.push(allOptions[optionIndex].label);
            }
          }
        });
        return (
          <Typography order={5} className="font-light">
            {labels.toString()}
          </Typography>
        );
      }

      case FormInputType.RADIO: {
        const optionKeysSelected =
          ReduxFormContext[formKey].keyStore[newBasePath];
        const allOptions = renderElement.options;
        let label: String = "";
        for (
          let optionIndex = 0;
          optionIndex < allOptions.length;
          optionIndex++
        ) {
          if (allOptions[optionIndex].key == optionKeysSelected) {
            label = allOptions[optionIndex].label;
          }
        }
        return (
          <Typography order={5} className="font-light">
            {label}
          </Typography>
        );
      }

      default:
        return (
          <Typography order={5} className="font-light">
            {ReduxFormContext[formKey].keyStore[newBasePath]
              ? ReduxFormContext[formKey].keyStore[newBasePath].toString()
              : "-"}
          </Typography>
        );
    }
  };

  const render = (): React.ReactElement => {
    // For ViewOnly
    if (
      viewOnly &&
      renderElement.type !== FormType.REPEATABLE_SECTION &&
      renderElement.type !== FormType.SECTION
    ) {
      return (
        <div className="mt-2 mb-2">
          <Input.Label className="font-bold">{renderElement.label}</Input.Label>
          {Viewer()}
        </div>
      );
    } else {
      // For Form Rendering
      switch (renderElement.type) {
        case FormType.SECTION:
          if (
            !renderElement.visible ||
            renderElement.visible.validator(
              populate(renderElement.visible.props as string[])
            )
          ) {
            return (
              <React.Fragment>
                <Typography order={3}>{renderElement.title}</Typography>
                <Typography order={6} className="font-light">
                  {renderElement.description}
                </Typography>
                {renderElement.formElements.map(
                  (
                    newRenderElement: Section | FormElement | RepeatableSection,
                    renderElementIndex: number
                  ): React.ReactElement => {
                    const newBasePath = `${basePath}[${renderElement.key}]-`;
                    return (
                      <React.Fragment
                        key={
                          `${renderElement.key}-${renderElementIndex}` as React.Key
                        }
                      >
                        <Renderer
                          renderElement={newRenderElement}
                          basePath={newBasePath}
                          formKey={formKey}
                          formBuilderSchema={formBuilderSchema}
                          keyIndex={[...keyIndex, renderElementIndex]}
                          initialSchema={initialSchema}
                          viewOnly={viewOnly}
                        />
                      </React.Fragment>
                    );
                  }
                )}
              </React.Fragment>
            );
          } else return <></>;

        case FormType.REPEATABLE_SECTION:
          return (
            <div
              style={{
                boxShadow: BOX_SHADOW.LOW,
              }}
              className="mt-5 mb-10"
            >
              {renderElement.formElements.map(
                (
                  repeatingSection: Array<
                    Section | FormElement | RepeatableSection
                  >,
                  repeatingSectionIndex: number
                ): React.ReactElement => {
                  return (
                    <div key={`${basePath}-${repeatingSectionIndex}`}>
                      <div className="flex justify-between align-middle">
                        <Typography order={3}>
                          {renderElement.title} {repeatingSectionIndex + 1}
                        </Typography>
                        <Typography order={6} className="font-light">
                          {renderElement.description}
                        </Typography>

                        {renderElement.formElements.length > 1 && !viewOnly && (
                          <Typography
                            className="cursor-pointer"
                            color={"red"}
                            order={5}
                            onClick={() => {
                              deleteRepeatingSection(
                                repeatingSectionIndex,
                                renderElement.formElements.length
                              );
                            }}
                          >
                            REMOVE
                          </Typography>
                        )}
                      </div>
                      {repeatingSection.map(
                        (
                          section: Section | FormElement | RepeatableSection,
                          sectionIndex: number
                        ) => {
                          const newBasePath = `${basePath}[${renderElement.key}]-(${repeatingSectionIndex})-`;
                          return (
                            <div key={`${newBasePath}-${sectionIndex}`}>
                              <Renderer
                                renderElement={section}
                                basePath={newBasePath}
                                formKey={formKey}
                                formBuilderSchema={formBuilderSchema}
                                keyIndex={[
                                  ...keyIndex,
                                  repeatingSectionIndex,
                                  sectionIndex,
                                ]}
                                viewOnly={viewOnly}
                                initialSchema={initialSchema}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                }
              )}
              {!viewOnly && (
                <Button
                  variant="outlined"
                  color="purple"
                  size="sm"
                  onClick={addRepeatingSection}
                >
                  + Add {renderElement.title}
                </Button>
              )}
            </div>
          );

        case FormInputType.SHORT_TEXT:
          return (
            <ShortText
              formElement={renderElement}
              basePath={`${basePath}[${renderElement.key}]`}
              formKey={formKey}
              formBuilderSchema={formBuilderSchema}
            />
          );
        case FormInputType.PASSWORD_CREATION:
          return (
            <PasswordCreation
              formElement={renderElement}
              basePath={`${basePath}[${renderElement.key}]`}
              formKey={formKey}
              formBuilderSchema={formBuilderSchema}
            />
          );
        case FormInputType.LONG_TEXT:
          return (
            <LongText
              formElement={renderElement}
              basePath={`${basePath}[${renderElement.key}]`}
              formKey={formKey}
              formBuilderSchema={formBuilderSchema}
            />
          );
        case FormInputType.NUMBER:
          return (
            <NumberInput
              formElement={renderElement}
              basePath={`${basePath}[${renderElement.key}]`}
              formKey={formKey}
              formBuilderSchema={formBuilderSchema}
            />
          );

        case FormInputType.CHECKBOX:
          return (
            <CheckboxInput
              renderElement={renderElement}
              formKey={formKey}
              basePath={`${basePath}[${renderElement.key}]`}
              formBuilderSchema={formBuilderSchema}
            />
          );
        case FormInputType.RADIO:
          return (
            <RadioInput
              renderElement={renderElement}
              formKey={formKey}
              basePath={`${basePath}[${renderElement.key}]`}
              formBuilderSchema={formBuilderSchema}
            />
          );

        case FormInputType.CURRENCY:
          return (
            <CurrencyInput
              renderElement={renderElement}
              formKey={formKey}
              basePath={`${basePath}[${renderElement.key}]`}
              formBuilderSchema={formBuilderSchema}
            />
          );

        case FormInputType.FILE:
          return (
            <FileInput
              renderElement={renderElement}
              formKey={formKey}
              basePath={`${basePath}[${renderElement.key}]`}
              formBuilderSchema={formBuilderSchema}
            />
          );

        default:
          return <></>;
      }
    }
  };

  return <React.Fragment>{render()}</React.Fragment>;
}

export default Renderer;
