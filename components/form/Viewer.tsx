import React from "react";
import useExportableFormData from "../../hooks/useExportableFormData";

function Viewer({ formKey }: { formKey: string }) {
  const { exportableFormView } = useExportableFormData({ formKey });

  return <div>Viewer</div>;
}

export default Viewer;
