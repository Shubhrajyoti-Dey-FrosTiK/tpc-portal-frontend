"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Types
import { FormBuilder, RepeatableSection, Section } from "../../types/Form";

// Components
import { Typography, Button, useMantineTheme } from "../components";
const Renderer = dynamic(import("./Renderer"));

// Icons
import { IconCheck } from "@tabler/icons";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  initializeFormState,
  postForm,
  selectForm,
  trySubmit,
} from "../../store/states/formSlice";
import { FormElement } from "../../types/FormType";
import useExportableFormData from "../../hooks/useExportableFormData";
import { StepperComponent } from "./Stepper";
import Viewer from "./Viewer";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface GoToPath {
  name: string;
  path: string;
}

function Form({
  schema,
  children,
  successText,
  successDescription,
  postUrl,
  postFunction,
  bodyTemplate,
  goToPath,
}: {
  schema: FormBuilder;
  children?: React.ReactNode;
  successText?: string;
  successDescription?: string;
  postUrl: string;
  postFunction?: () => Promise<boolean>;
  postError?: string;
  bodyTemplate?: object;
  goToPath?: GoToPath;
}) {
  const formState = useSelector(selectForm);
  const router = useRouter();
  const { exportableFormState, checkValidated, fileUploader } =
    useExportableFormData({
      formKey: schema.key as string,
    });
  const theme = useMantineTheme();
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    dispatch(
      initializeFormState({
        formKey: schema.key as string,
        formBuilderSchema: schema,
      })
    );
  }, []);

  const handleSubmit = async () => {
    console.log(
      checkValidated(),
      formState[schema.key as string].keyStore,
      formState[schema.key as string].validationStore
    );
    if (step === 1) {
      dispatch(trySubmit({ formKey: schema.key as string }));
      if (checkValidated()) setStep(step + 1);
    }

    if (step == 2) {
      setLoading(true);
      const { exportData, keyStore } = await fileUploader();
      console.log(
        bodyTemplate
          ? { ...bodyTemplate, ...exportData, keyStore }
          : { ...exportData, keyStore }
      );
      const postResponse = await axios.post(
        postUrl,
        bodyTemplate
          ? { ...bodyTemplate, ...exportData, keyStore }
          : { ...exportData, keyStore }
      );
      console.log(postResponse);
      setLoading(false);
      setStep(step + 1);
      if (postFunction && (await postFunction())) {
      }
      dispatch(postForm({ formKey: schema.key as string }));
    }
  };

  return (
    <div className="m-7">
      <div className="mb-5">
        <StepperComponent step={step} />
      </div>
      <div style={{ display: `${step == 1 ? "block" : "none"}` }}>
        <Typography order={1}>{schema.title}</Typography>
        <Typography order={4} className="font-light mb-5">
          {schema.description}
        </Typography>
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
      </div>

      <div>
        {step === 2 && (
          <div>
            <Typography order={1}>{schema.title}</Typography>
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
                        viewOnly={true}
                      />
                    </React.Fragment>
                  );
                }
              )}
          </div>
        )}
      </div>

      {step < 3 && (
        <div className="flex justify-between">
          <div>
            {step > 1 && (
              <Button
                className="mt-4"
                ripple={true}
                aria-hidden={true}
                color="purple"
                onClick={() => setStep(step - 1)}
                variant="outlined"
              >
                BACK
              </Button>
            )}
          </div>
          <Button
            className="mt-4"
            ripple={true}
            aria-hidden={true}
            onClick={handleSubmit}
            color="purple"
            variant="gradient"
          >
            {step < 2 ? "NEXT" : "SUBMIT"}
          </Button>
        </div>
      )}

      <div>
        {step == 3 &&
          (children ? (
            <div>{children}</div>
          ) : (
            <div>
              <IconCheck
                stroke={1.5}
                size={200}
                className="m-auto"
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
              <Typography className="text-center">
                {successText || "Success"}
              </Typography>
              <Typography order={5} className="text-center">
                {successDescription ||
                  "You can fill another JAF or edit and preview in the dashboard !"}
              </Typography>
              <div className="w-full flex justify-center mt-5">
                <Button
                  className="mt-4 m-auto"
                  ripple={true}
                  aria-hidden={true}
                  color="purple"
                  onClick={() => {
                    if (goToPath) {
                      router.push(goToPath.path);
                    } else router.push("/");
                  }}
                  variant="gradient"
                >
                  {goToPath ? goToPath.name : "Go to Dashboard"}
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Form;
