"use client";

import React from "react";

// Types
import { FormElement, Section } from "../../types/Form";
import { FormType } from "../../types/FormType";

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
            (newRenderElement): React.ReactElement => {
              return (
                <React.Fragment
                  key={`${basePath}[${newRenderElement.key}]-` as React.Key}
                >
                  <Renderer
                    renderElement={newRenderElement}
                    basePath={`${basePath}[${renderElement.key}]-`}
                    formKey={formKey}
                  />
                </React.Fragment>
              );
            }
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ShortText
            formElement={renderElement}
            basePath={`${basePath}[${renderElement.key}]`}
            formKey={formKey}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Renderer;
