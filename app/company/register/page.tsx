import React from "react";
import { Typography } from "../../../components/components";
import Form from "../../../components/form/Form";
import CompanyRegisterSchema from "../../../configs/CompanyRegisterSchema";

function Page() {
  return (
    <div>
      <div className="max-w-[800px] m-auto">
        <Form schema={CompanyRegisterSchema} postUrl="jkbuio" />
      </div>
    </div>
  );
}

export default Page;
