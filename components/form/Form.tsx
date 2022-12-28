"use client";

import React from "react";

// Types
import { FormBuilder, RepeatableSection, Section } from "../../types/Form";

// Components
import { Typography, Button } from "../components";
import Renderer from "./Renderer";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { initializeFormState, selectForm } from "../../store/states/formSlice";
import { FormElement } from "../../types/FormType";

function Form({ schema }: { schema: FormBuilder }) {
  const formState = useSelector(selectForm);
  console.log(formState[schema.key as string]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      initializeFormState({
        formKey: schema.key as string,
        formBuilderSchema: schema,
      })
    );
  }, []);

  return (
    <div className="m-5">
      <Typography order={1}>{schema.title}</Typography>
      <Typography order={4}>{schema.description}</Typography>
      {formState[schema.key as string] &&
        formState[schema.key as string].formBuilderSchema.sections.map(
          (
            section: FormElement | Section | RepeatableSection,
            sectionIndex: number
          ): React.ReactNode => {
            return (
              <React.Fragment key={section.key as React.Key}>
                <Renderer
                  renderElement={section}
                  basePath={"" as string}
                  formKey={schema.key as string}
                  formBuilderSchema={formState[schema.key as string]}
                  keyIndex={[sectionIndex]}
                  initialSchema={schema}
                />
              </React.Fragment>
            );
          }
        )}
      <Button
        className="mt-4"
        ripple={true}
        aria-hidden={true}
        variant="gradient"
      >
        SUBMIT
      </Button>
    </div>
  );
}

export default Form;
