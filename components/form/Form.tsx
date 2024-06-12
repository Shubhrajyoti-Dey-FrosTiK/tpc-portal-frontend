"use client";

import React, { useState } from "react";

// Types
import {
  FormBuilder,
  KeyStore,
  RepeatableSection,
  Section,
} from "./types/Form";

// Components
import { Button, Typography, useMantineTheme } from "../components";
// const Renderer = dynamic(import("./Renderer"));
import Renderer from "./Renderer";

// Icons
import { IconCheck } from "@tabler/icons";

// Redux
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import useExportableFormData from "./hooks/useExportableFormData";
import {
  initializeFormState,
  postForm,
  selectForm,
  setSandbox,
  trySubmit,
} from "./states/formSlice";
import { StepperComponent } from "./Stepper";
import { FormElement } from "./types/FormType";
import Viewer from "./Viewer";

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
  edit,
  sandbox,
  goToButton,
  variables,
  headers,
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
  variables?: object;
  headers?: { [key: string]: string | string[] };
  edit?: {
    keyStore: KeyStore;
  };
  sandbox?: boolean;
  goToButton?: boolean;
}) {
  const FormState = useSelector(selectForm);
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
    let keyStore: KeyStore = edit ? edit.keyStore : {};
    if (variables) keyStore = { ...keyStore, ...variables };
    dispatch(
      initializeFormState({
        keyStore: keyStore,
        formKey: schema.key as string,
        formBuilderSchema: schema,
      })
    );
  }, []);

  const handleSubmit = async () => {
    if (step === 1) {
      dispatch(trySubmit({ formKey: schema.key as string }));
      if (checkValidated()) {
        if (sandbox) {
          setLoading(true);

          const { exportData, keyStore } = await fileUploader();
          dispatch(
            setSandbox({
              formKey: schema.key as string,
              sandbox: {
                submitted: true,
                keyStore,
                exportData,
              },
            })
          );
          setStep(3);
          setLoading(false);
        } else {
          setStep(step + 1);
        }
      }
    }

    if (step == 2) {
      setLoading(true);
      const { exportData, keyStore } = await fileUploader();

      if (edit && edit.keyStore) {
        await axios.put(
          postUrl,
          bodyTemplate
            ? { ...bodyTemplate, ...exportData, keyStore }
            : { ...exportData, keyStore },
            { headers: headers }
        );
      } else {
        await axios.post(
          postUrl,
          bodyTemplate
            ? { ...bodyTemplate, ...exportData, keyStore }
            : { ...exportData, keyStore },
            { headers: headers }
        );
      }

      setLoading(false);
      setStep(step + 1);
      if (postFunction && (await postFunction())) {
      }
      dispatch(postForm({ formKey: schema.key as string }));
    }
  };

  return (
    <div className="m-7">
      {!sandbox && (
        <div className="mb-5">
          <StepperComponent step={step} />
        </div>
      )}

      {/* Step 1  */}
      <div style={{ display: `${step == 1 ? "block" : "none"}` }}>
        <Typography order={1}>{schema.title}</Typography>
        <Typography order={4} className="mb-5 font-light">
          {schema.description}
        </Typography>
        {FormState[schema.key as string] &&
          FormState[schema.key as string].formBuilderSchema.sections.map(
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
                    formBuilderSchema={FormState[schema.key as string]}
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
          <>
            <div style={{ display: `${loading ? "none" : "block"}` }}>
              <Viewer schema={schema} />
            </div>
            <div
              style={{
                display: `${loading ? "block" : "none"}`,
                minHeight: "60dvh",
              }}
            >
              <Spinner />
            </div>
          </>
        )}
      </div>

      {!loading && step < 3 && (
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
            {step < 2 && !sandbox ? "NEXT" : "SUBMIT"}
          </Button>
        </div>
      )}

      <div>
        {!loading &&
          step == 3 &&
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
              {goToButton && (
                <div className="mt-5 flex w-full justify-center">
                  <Button
                    className="m-auto mt-4"
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
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Form;
