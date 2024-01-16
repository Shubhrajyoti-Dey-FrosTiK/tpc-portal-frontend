"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Form from "../../../components/form/Form";
import IAFSchema from "../../../configs/IAFSchema";
import { selectIdStore } from "../../../store/states/idStore";
import { selectUser } from "../../../store/states/userSlice";
// export const runtime = "edge";

function IAF() {
  const IdStore = useSelector(selectIdStore);
  const User = useSelector(selectUser);
  const [domain, setDomain] = useState<string>("");

  const fetchEmail = async () => {
    const email = User.currentUser.email;
    if (email && email.split("@").length > 1) {
      setDomain(`${email.split("@")[1]}`);
    }
  };

  useEffect(() => {
    if (User.currentUser) {
      fetchEmail();
    }
  }, [User.currentUser]);

  return (
    <div className="max-w-[800px] m-auto pl-5 pr-5">
      <Form
        schema={IAFSchema}
        bodyTemplate={{
          recruiter: IdStore.recruiterId,
          company: IdStore.companyId,
          domain,
        }}
        variables={{ companyId: IdStore.companyId }}
        postUrl={`${process.env.NEXT_PUBLIC_IAF_JAF_BACKEND}/iaf` || ""}
      />
    </div>
  );
}

export default IAF;
