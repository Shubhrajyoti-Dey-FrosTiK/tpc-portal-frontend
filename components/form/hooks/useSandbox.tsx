"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteForm, selectForm } from "../states/formSlice";
import { KeyStore } from "../types/Form";

function useSandboxed({ formKey }: { formKey: string }) {
  const FormState = useSelector(selectForm);
  const dispatch = useDispatch();
  const [keyStore, setKeyStore] = useState<KeyStore>({});
  const [exportData, setExportData] = useState<object>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setKeyStore(FormState[formKey]?.sandbox.keyStore);
    setSubmitted(FormState[formKey]?.sandbox.submitted);
    setExportData(FormState[formKey]?.sandbox.exportData);
  }, [FormState[formKey]?.sandbox]);

  function clearFormState() {
    dispatch(deleteForm(formKey));
  }

  return {
    keyStore,
    exportData,
    submitted,
    clearFormState,
  };
}

export default useSandboxed;
