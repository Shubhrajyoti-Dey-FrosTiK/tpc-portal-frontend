"use client";

import React from "react";
import { useSelector } from "react-redux";
import Form from "../../../components/form/Form";
import IAFSchema from "../../../configs/IAFSchema";
import { selectIdStore } from "../../../store/states/idStore";

// export const runtime = "edge";

function IAF() {
  const IdStore = useSelector(selectIdStore);

  return (
    <div className="max-w-[800px] m-auto">
      <Form
        schema={IAFSchema}
        bodyTemplate={{
          recruiter: IdStore.recruiterId,
          company: IdStore.companyId,
        }}
        postUrl={`${process.env.NEXT_PUBLIC_IAF_JAF_BACKEND}/iaf` || ""}
      />
    </div>
  );
}

export default IAF;
