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
} from "../types/Form";
import { FormElement } from "../types/FormType";

function useExportableFormData({ formKey }: { formKey: string }) {
  const FS = new FormService();
  const FormContext = useSelector(selectForm);

  const [exportableFormState, setExportableFormState] =
    React.useState<ExportableFormState>({});

  const exportFormData = () => {
    let exportData: ExportableFormState = {};
    if (!FormContext[formKey]) return;
    const keyStoreSnapshot: KeyStore = { ...FormContext[formKey].keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...FormContext[formKey].formBuilderSchema.sections];

    formStateSnapshot.forEach((element) => {
      exportData[element.key as string] = {};
      FS.recursiveExporter(
        keyStoreSnapshot,
        element,
        exportData,
        "",
        exportData
      );
    });

    setExportableFormState(exportData);
  };

  React.useEffect(() => {
    exportFormData();
  }, [FormContext[formKey]]);

  return { exportableFormState };
}

export default useExportableFormData;
