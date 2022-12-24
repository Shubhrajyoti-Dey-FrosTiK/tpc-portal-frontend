"use client";

import React from "react";

// Types
import { FormBuilder } from "../../types/Form";

// Components
import { Typography, Button } from "../components";
import Renderer from "./Renderer";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { initializeFormState, selectForm } from "../../store/states/formSlice";

function Form({ schema }: { schema: FormBuilder }) {
  const formState = useSelector(selectForm);
  console.log(formState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initializeFormState({ formKey: schema.key as string }));
  }, []);

  return (
    <div className="m-5">
      <Typography order={1}>{schema.Typography}</Typography>
      <Typography order={4}>{schema.description}</Typography>
      {schema.sections.map((section): React.ReactNode => {
        return (
          <React.Fragment key={section.key as React.Key}>
            <Renderer
              renderElement={section}
              basePath={"" as string}
              formKey={schema.key as string}
            />
          </React.Fragment>
        );
      })}
      <Button className="mt-4" aria-hidden={true} variant="filled">
        SUBMIT
      </Button>
    </div>
  );
}

export default Form;
