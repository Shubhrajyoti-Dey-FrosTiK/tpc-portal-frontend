"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../../../components/components";
import Form from "../../../components/form/Form";
import RecruiterAndCompanyRegisterSchema from "../../../configs/CompanyRegisterSchema";
import { handleSignUpWithEmailPassword } from "../../../firebase/auth";
import useExportableFormData from "../../../hooks/useExportableFormData";
import { selectForm } from "../../../store/states/formSlice";

function Page() {
  const {} = useExportableFormData({
    formKey: "recruiterAndCompanyRegistration",
  });

  const FormState = useSelector(selectForm);

  const handleSignIn = async () => {
    const user = await handleSignUpWithEmailPassword(
      FormState["recruiterAndCompanyRegistration"].keyStore[
        "[recruiter]-[email]"
      ],
      FormState["recruiterAndCompanyRegistration"].keyStore[
        "[passwordCreation]-[password]"
      ]
    );
    if (user.error) {
      return false;
    } else return true;
  };

  useEffect(() => {
    if (
      FormState["recruiterAndCompanyRegistration"] &&
      FormState["recruiterAndCompanyRegistration"].posted
    ) {
      console.log("Hello from heerreee");
      handleSignIn();
    }
  }, [FormState["recruiterAndCompanyRegistration"]]);

  useEffect(() => {}, []);
  return (
    <div>
      <div className="max-w-[800px] m-auto">
        <Form
          schema={RecruiterAndCompanyRegisterSchema}
          postFunction={handleSignIn}
          postUrl={`${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/register/recruiterAndCompany`}
        />
      </div>
    </div>
  );
}

export default Page;
