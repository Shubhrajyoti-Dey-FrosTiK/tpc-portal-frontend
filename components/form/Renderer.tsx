"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { BOX_SHADOW } from "../../constants/boxShadow";
import { updateRepeatingSection } from "../../store/states/formSlice";

// Types
import { FormBuilder, RepeatableSection, Section } from "../../types/Form";
import { FormType, FormElement, FormInputType } from "../../types/FormType";
import { Button, Typography } from "../components";
import LongText from "./input/LongText";
import NumberInput from "./input/NumberInput";

// Components
import ShortText from "./input/ShortText";

function Renderer({
  renderElement,
  basePath,
  formKey,
  formBuilderSchema,
  keyIndex,
  initialSchema,
}: {
  renderElement: Section | FormElement | RepeatableSection;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
  keyIndex: Array<number>;
  initialSchema: FormBuilder;
}): React.ReactElement {
  const dispatch = useDispatch();

  const addRepeatingSection = () => {
    dispatch(
      updateRepeatingSection({
        formKey,
        keyIndices: keyIndex,
        initialSchema,
      })
    );
  };

  const render = (): React.ReactElement => {
    switch (renderElement.type) {
      case FormType.SECTION:
        return (
          <React.Fragment>
            <Typography order={3}>{renderElement.title}</Typography>
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
                    />
                  </React.Fragment>
                );
              }
            )}
          </React.Fragment>
        );

      case FormType.REPEATABLE_SECTION:
        return (
          <div
            style={{
              boxShadow: BOX_SHADOW.LOW,
            }}
            className="mt-5 mb-10 border-r-4 p-4"
          >
            {renderElement.formElements.map(
              (
                repeatingSection: Array<
                  Section | FormElement | RepeatableSection
                >,
                repeatingSectionIndex: number
              ): React.ReactElement => {
                return (
                  <React.Fragment key={`${basePath}-${repeatingSectionIndex}`}>
                    <Typography order={3}>
                      {renderElement.title} {repeatingSectionIndex + 1}
                    </Typography>
                    {repeatingSection.map(
                      (
                        section: Section | FormElement | RepeatableSection,
                        sectionIndex: number
                      ) => {
                        const newBasePath = `${basePath}[${renderElement.key}]-(${repeatingSectionIndex})-`;
                        return (
                          <React.Fragment
                            key={`${newBasePath}-${sectionIndex}`}
                          >
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
                              initialSchema={initialSchema}
                            />
                          </React.Fragment>
                        );
                      }
                    )}
                  </React.Fragment>
                );
              }
            )}
            <Button variant="outlined" onClick={addRepeatingSection}>
              + Add {renderElement.title}
            </Button>
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

      default:
        return <></>;
    }
  };

  return <React.Fragment>{render()}</React.Fragment>;
}

export default Renderer;
