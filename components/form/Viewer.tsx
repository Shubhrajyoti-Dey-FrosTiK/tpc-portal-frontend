import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeFormState, selectForm } from "../../store/states/formSlice";
import {
  FormBuilder,
  KeyStore,
  RepeatableSection,
  Section,
} from "../../types/Form";
import { FormElement } from "../../types/FormType";
import Renderer from "./Renderer";

function Viewer({
  schema,
  keyStore,
}: {
  schema: FormBuilder;
  keyStore?: KeyStore;
}) {
  const formState = useSelector(selectForm);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      initializeFormState({
        formKey: schema.key as string,
        formBuilderSchema: schema,
        keyStore: keyStore,
      })
    );
  }, []);

  return (
    <div>
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
  );
}

export default Viewer;
