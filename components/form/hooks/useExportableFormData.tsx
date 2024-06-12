import React from "react";

// Redux
import { useSelector } from "react-redux";
import { selectForm } from "../states/formSlice";

// Services
import FormService from "../services/form.service";

// Types
import {
  ExportableFormState,
  FormBuilder,
  FormState,
  KeyStore,
  RepeatableSection,
  Section,
  ValidationStore,
} from "../types/Form";
import { FormElement } from "../types/FormType";
import PDFService, { PDFSchema } from "../services/pdf.service";

function useExportableFormData({ formKey }: { formKey: string }) {
  const FS = new FormService();
  const pdf = new PDFService();
  const FormContext = useSelector(selectForm);

  const [exportableFormState, setExportableFormState] =
    React.useState<ExportableFormState>({});

  const exportFormData = async () => {
    let exportData: ExportableFormState = {};
    if (!FormContext[formKey]) return;
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    // formStateSnapshot.forEach(async (element) => {
    //   exportData[element.key as string] = {};
    //   await FS.recursiveExporter(keyStoreSnapshot, element, exportData, "");
    // });

    formStateSnapshot.forEach(async (element) => {
      exportData[element.key as any] = await FS.recursiveExporterV2(
        keyStoreSnapshot,
        FormContext[formKey],
        element,
        ""
      );
    });

    setExportableFormState(exportData);
    return exportData;
  };

  const getBasePathData = (basePath: string, layer: number) => {
    let exportData: ExportableFormState = {};
    if (!FormContext[formKey]) return exportData;
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    formStateSnapshot.forEach(async (element) => {
      exportData[element.key as any] = FS.recursiveExporterWithoutUpload(
        keyStoreSnapshot,
        element,
        ""
      );
    });

    // setExportableFormState(exportData);
    const updatedBaseArray = basePath
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("[", "")
      .replaceAll("]", "")
      .split("-");

    const data = FS.getValue(
      exportData,
      updatedBaseArray.slice(0, updatedBaseArray.length - layer),
      0
    );
    return data;
  };

  const checkValidated = (): boolean => {
    if (!FormContext[formKey]) return false;
    const validationStore: ValidationStore =
      FormContext[formKey].validationStore;

    let exportData: ExportableFormState = {};
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    const validation = {
      status: true,
    };

    // for (
    //   let elementIndex = 0;
    //   elementIndex < formStateSnapshot.length;
    //   elementIndex++
    // ) {
    //   exportData[formStateSnapshot[elementIndex].key as string] = {};
    //   FS.recursiveValidationChecker(
    //     keyStoreSnapshot,
    //     formStateSnapshot[elementIndex],
    //     exportData,
    //     "",
    //     FormContext[formKey],
    //     validation,
    //     validationStore
    //   );
    // }

    formStateSnapshot.forEach(async (element) => {
      // @ts-ignore
      exportData[element.key] = FS.recursiveValidationCheckerV2(
        validationStore,
        FormContext[formKey],
        element,
        "",
        validation
      );
    });

    return validation.status;
  };

  const fileUploader = async (): Promise<{
    exportData: ExportableFormState;
    keyStore: KeyStore;
  }> => {
    let exportData: ExportableFormState = {};
    if (!FormContext[formKey])
      return {
        exportData: {},
        keyStore: {},
      };
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    for await (const element of formStateSnapshot) {
      // @ts-ignore
      exportData[element.key] = await FS.recursiveExporterV2(
        keyStoreSnapshot,
        FormContext[formKey],
        element,
        "",
        true
      );
    }

    return { exportData, keyStore: keyStoreSnapshot };
  };

  const exportFormDataPDF = (): PDFSchema => {
    let pdfSchema: PDFSchema = {
      content: [],
    };
    if (!FormContext[formKey]) return pdfSchema;

    const formStateSnapshot: FormState = { ...FormContext[formKey] };

    pdfSchema.content.push({
      text: FormContext[formKey].formBuilderSchema.title,
      style: { fontSize: 20, bold: true, alignment: "center" },
      margin: 20,
    });

    formStateSnapshot.formBuilderSchema.sections.forEach(async (element) => {
      pdf.recursiveExporterPDF(
        formStateSnapshot.keyStore,
        element,
        pdfSchema,
        "",
        formStateSnapshot
      );
    });

    return pdfSchema;
  };

  return {
    exportableFormState,
    checkValidated,
    fileUploader,
    exportFormData,
    getBasePathData,
    exportFormDataPDF,
  };
}

export default useExportableFormData;
