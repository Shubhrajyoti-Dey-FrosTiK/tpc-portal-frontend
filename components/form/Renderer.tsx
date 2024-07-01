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
} from "./states/formSlice";

// Types
import { Button, Input, Paper, Text, Typography } from "../components";
import { FormBuilder, RepeatableSection, Section } from "./types/Form";
import { FormElement, FormInputType, FormType } from "./types/FormType";

import CheckboxInput from "./input/Checkbox/v1/Checkbox";
import CurrencyInput from "./input/Currency/v1/CurrencyInput";
import MultiDropdown from "./input/Dropdown/v1/MultiDropdown";
import SingularDropdown from "./input/Dropdown/v1/SingularDropdown";
import FileInput from "./input/File/v1/FileInput";
import NumberInput from "./input/Number/v1/NumberInput";
import RadioInput from "./input/Radio/v1/RadioInput";
import LongText from "./input/Text/v1/LongText";
import Switch from "./input/Switch/v1/Switch";
import PasswordCreation from "./input/Text/v1/PasswordCreation";
import ShortText from "./input/Text/v1/ShortText";

const EditorInput = dynamic(() => import("./input/Editor/v1/EditorInput"), {
  loading: () => <p>Loading</p>,
  ssr: false,
});
const EditorViewer = dynamic(() => import("./input/Editor/v1/Viewer"), {
  loading: () => <p>Loading</p>,
  ssr: false,
});

const EditorV2Input = dynamic(() => import("./input/Editor/v2/EditorV2Input"), {
  loading: () => <p>Loading</p>,
  ssr: false,
});
const EditorV2Viewer = dynamic(() => import("./input/Editor/v2/Viewer"), {
  loading: () => <p>Loading</p>,
  ssr: false,
});

const EditorV3Input = dynamic(() => import("./input/Editor/v3/EditorV3Input"), {
  loading: () => <p>Loading</p>,
  ssr: false,
});
const EditorV3Viewer = dynamic(() => import("./input/Editor/v3/Viewer"), {
  loading: () => <p>Loading</p>,
  ssr: false,
});

import DateTimeInput from "./input/Date/v1/DateTimeInput";
import useExportableFormData from "./hooks/useExportableFormData";

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
  const { getBasePathData } = useExportableFormData({ formKey });

  const populate = (propsList: Array<string>) => {
    let populateValues: Array<String> = [];
    propsList.forEach((prop) => {
      if (prop === "SELF")
        populateValues.push(ReduxFormContext[formKey]?.keyStore[basePath]);
      else if (prop.includes("OUTER_NUTSHELL")) {
        let layer = 1;
        const propArray = prop.split("_");
        if (propArray.length > 2) {
          layer = Number(propArray[2]);
        }
        populateValues.push(getBasePathData(basePath, layer));
      } else populateValues.push(ReduxFormContext[formKey]?.keyStore[prop]);
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
                          className="mt-3 flex justify-between"
                          withBorder
                        >
                          <div className="flex items-center gap-2">
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

      case FormInputType.MULTI_DROPDOWN: {
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

      case FormInputType.EDITOR_INPUT: {
        return (
          <EditorViewer
            state={ReduxFormContext[formKey].keyStore[newBasePath]}
          />
        );
      }

      case FormInputType.EDITOR_V2_INPUT: {
        return (
          <EditorV2Viewer
            state={ReduxFormContext[formKey].keyStore[newBasePath]}
          />
        );
      }

      case FormInputType.EDITOR_V3_INPUT: {
        return (
          <EditorV3Viewer
            content={ReduxFormContext[formKey].keyStore[newBasePath]}
          />
        );
      }

      case FormInputType.SINGULAR_DROPDOWN: {
        const optionKeysSelected =
          ReduxFormContext[formKey].keyStore[newBasePath];
        const allOptions = renderElement.options;
        let label: String = optionKeysSelected;
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
      renderElement.type !== FormType.SECTION &&
      (!renderElement.visible ||
        renderElement.visible.validator(
          populate(renderElement.visible.props as string[])
        ))
    ) {
      return (
        <div className="mb-2 mt-2">
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

        case FormType.REPEATABLE_SECTION: {
          if (
            !renderElement.visible ||
            renderElement.visible.validator(
              populate(renderElement.visible.props as string[])
            )
          ) {
            return (
              <div
                style={{
                  boxShadow: BOX_SHADOW.LOW,
                }}
                className="mb-10 mt-5"
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
                          {!renderElement.headerOverride ? (
                            <div>
                              <Typography order={3}>
                                {renderElement.title}{" "}
                                {repeatingSectionIndex + 1}
                              </Typography>
                              <Typography order={6} className="font-light">
                                {renderElement.description}
                              </Typography>
                            </div>
                          ) : (
                            <div></div>
                          )}

                          {renderElement.formElements.length > 1 &&
                            !viewOnly && (
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
          }

          return <></>;
        }

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
        case FormInputType.SWITCH_INPUT:
          return (
            <Switch
              formElement={renderElement}
              basePath={`${basePath}[${renderElement.key}]`}
              formKey={formKey}
              formBuilderSchema={formBuilderSchema}
            />
          );

        case FormInputType.MULTI_DROPDOWN:
          return (
            <MultiDropdown
              renderElement={renderElement}
              formKey={formKey}
              basePath={`${basePath}[${renderElement.key}]`}
              formBuilderSchema={formBuilderSchema}
            />
          );

        case FormInputType.EDITOR_INPUT:
          return (
            <>
              <EditorInput
                formElement={renderElement}
                basePath={`${basePath}[${renderElement.key}]`}
                formKey={formKey}
                formBuilderSchema={formBuilderSchema}
              />
            </>
          );

        case FormInputType.EDITOR_V2_INPUT:
          return (
            <>
              <EditorV2Input
                formElement={renderElement}
                basePath={`${basePath}[${renderElement.key}]`}
                formKey={formKey}
                formBuilderSchema={formBuilderSchema}
              />
            </>
          );

        case FormInputType.EDITOR_V3_INPUT:
          return (
            <>
              <EditorV3Input
                formElement={renderElement}
                basePath={`${basePath}[${renderElement.key}]`}
                formKey={formKey}
                formBuilderSchema={formBuilderSchema}
              />
            </>
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

        case FormInputType.SINGULAR_DROPDOWN:
          return (
            <SingularDropdown
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
        case FormInputType.DATE_TIME:
          return (
            <DateTimeInput
              formElement={renderElement}
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
