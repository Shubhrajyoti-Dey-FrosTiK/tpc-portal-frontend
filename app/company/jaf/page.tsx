"use client";

import React from "react";
import { useSelector } from "react-redux";
import Form from "../../../components/form/Form";
import JAFSchema from "../../../configs/JAFSchema";
import { selectIdStore } from "../../../store/states/idStore";

// export const runtime = "edge";

function JAF() {
  const IdStore = useSelector(selectIdStore);

  return (
    <div className="max-w-[800px] m-auto">
      <Form
        schema={JAFSchema}
        bodyTemplate={{
          recruiter: IdStore.recruiterId,
          company: IdStore.companyId,
        }}
        postUrl={`${process.env.NEXT_PUBLIC_IAF_JAF_BACKEND}/jaf` || ""}
      />
    </div>
  );
}

export default JAF;
