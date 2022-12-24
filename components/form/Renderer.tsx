"use client";

import React from "react";

// Types
import { Section } from "../../types/Form";
import { FormType, FormElement, FormInputType } from "../../types/FormType";
import LongText from "./input/LongText";
import NumberInput from "./input/NumberInput";

// Components
import ShortText from "./input/ShortText";

function Renderer({
  renderElement,
  basePath,
  formKey,
}: {
  renderElement: Section | FormElement;
  basePath: string;
  formKey: string;
}): React.ReactElement {
  return (
    <React.Fragment>
      {renderElement.type == FormType.SECTION ? (
        <React.Fragment>
          {renderElement.formElements.map(
            (
              newRenderElement: any,
              renderElementIndex: any
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
                  />
                </React.Fragment>
              );
            }
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {renderElement.type === FormInputType.SHORT_TEXT && (
            <ShortText
              formElement={renderElement}
              basePath={`${basePath}[${renderElement.key}]`}
              formKey={formKey}
            />
          )}
          {renderElement.type === FormInputType.LONG_TEXT && (
            <LongText
              formElement={renderElement}
              basePath={`${basePath}[${renderElement.key}]`}
              formKey={formKey}
            />
          )}
          {renderElement.type === FormInputType.NUMBER && (
            <NumberInput
              formElement={renderElement}
              basePath={`${basePath}[${renderElement.key}]`}
              formKey={formKey}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Renderer;
