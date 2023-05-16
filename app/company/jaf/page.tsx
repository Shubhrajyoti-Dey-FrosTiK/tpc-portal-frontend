import React from "react";
import Form from "../../../components/form/Form";
import JAFSchema from "../../../configs/JAFSchema";

function page() {
  return (
    <div className="max-w-[800px] m-auto">
      <Form schema={JAFSchema} postUrl="uhiu" />
    </div>
  );
}

export default page;
