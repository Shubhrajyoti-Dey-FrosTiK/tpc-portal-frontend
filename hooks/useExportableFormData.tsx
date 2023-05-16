import React from "react";

// Redux
import { useSelector } from "react-redux";
import { selectForm } from "../store/states/formSlice";

// Services
import FormService from "../services/form.service";

// Types
import {
  ExportableFormState,
  FormBuilder,
  KeyStore,
  RepeatableSection,
  Section,
  ValidationStore,
} from "../types/Form";
import { FormElement } from "../types/FormType";

function useExportableFormData({ formKey }: { formKey: string }) {
  const FS = new FormService();
  const FormContext = useSelector(selectForm);

  const [exportableFormState, setExportableFormState] =
    React.useState<ExportableFormState>({});

  const exportFormData = async () => {
    let exportData: ExportableFormState = {};
    if (!FormContext[formKey]) return;
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    formStateSnapshot.forEach(async (element) => {
      exportData[element.key as string] = {};
      await FS.recursiveExporter(keyStoreSnapshot, element, exportData, "");
    });

    setExportableFormState(exportData);
    return exportData;
  };

  const checkValidated = (): boolean => {
    if (!FormContext[formKey]) return false;
    const validationStore: ValidationStore =
      FormContext[formKey].validationStore;

    // let valid = true;
    // for (let key in validationStore) {
    //   if (!validationStore[key]) {
    //     valid = false;
    //     break;
    //   }
    // }

    // return valid;
    let exportData: ExportableFormState = {};
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    const validation = {
      status: true,
    };

    // formStateSnapshot.forEach((element) => {
    for (
      let elementIndex = 0;
      elementIndex < formStateSnapshot.length;
      elementIndex++
    ) {
      exportData[formStateSnapshot[elementIndex].key as string] = {};
      FS.recursiveValidationChecker(
        keyStoreSnapshot,
        formStateSnapshot[elementIndex],
        exportData,
        "",
        validation,
        validationStore
      );
    }

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

    // formStateSnapshot.forEach(async (element) => {

    for (let formIndex = 0; formIndex < formStateSnapshot.length; formIndex++) {
      exportData[formStateSnapshot[formIndex].key as string] = {};
      await FS.recursiveExporter(
        keyStoreSnapshot,
        formStateSnapshot[formIndex],
        exportData,
        "",
        true
      );
    }

    // const promises = Array.from(
    //   formStateSnapshot,
    //   async (form) =>
    //     await FS.recursiveExporter(keyStoreSnapshot, form, exportData, "", true)
    // );

    // await Promise.all(promises);

    return { exportData, keyStore: keyStoreSnapshot };
  };

  const exportableFormView = async () => {
    let exportData: ExportableFormState = {};
    if (!FormContext[formKey]) return;
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    formStateSnapshot.forEach(async (element) => {
      exportData[element.key as string] = {};
      await FS.recursiveViewConverter(
        keyStoreSnapshot,
        element,
        exportData,
        ""
      );
    });

    return exportData;
  };

  // React.useEffect(() => {
  // exportFormData();
  // if (FormContext[formKey])
  //   setExportableFormState(FormContext[formKey].formBuilderSchema);
  // }, [FormContext[formKey]]);

  return {
    exportableFormState,
    exportableFormView,
    checkValidated,
    fileUploader,
    exportFormData,
  };
}

export default useExportableFormData;
