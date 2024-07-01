import { IconDownload, IconFile } from "@tabler/icons-react";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../components";
import useExportableFormData from "./hooks/useExportableFormData";
import Renderer from "./Renderer";
import { initializeFormState, selectForm } from "./states/formSlice";
import {
  FormBuilder,
  KeyStore,
  RepeatableSection,
  Section,
} from "./types/Form";
import { FormElement } from "./types/FormType";

// @ts-ignore
pdfMake.addVirtualFileSystem(pdfFonts);

function Viewer({
  schema,
  keyStore,
}: {
  schema: FormBuilder;
  keyStore?: KeyStore;
}) {
  const FormState = useSelector(selectForm);
  const { exportFormDataPDF } = useExportableFormData({
    formKey: schema.key as string,
  });
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
      <div className="flex flex-col items-center justify-start md:flex-row md:justify-between">
        <Typography order={2}>{schema.title}</Typography>
        <div className="flex gap-3">
          <IconFile
            color="purple"
            className="cursor-pointer"
            onClick={() => {
              const pdfSchema = exportFormDataPDF();
              pdfMake.createPdf(pdfSchema).open();
            }}
          />
          <IconDownload
            color="purple"
            className="cursor-pointer"
            onClick={() => {
              const pdfSchema = exportFormDataPDF();
              pdfMake.createPdf(pdfSchema).download();
            }}
          />
        </div>
      </div>
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
