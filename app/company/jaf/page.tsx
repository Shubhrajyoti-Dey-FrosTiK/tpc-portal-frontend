"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Form from "../../../components/form/Form";
import JAFSchema from "../../../configs/JAFSchema";
import { selectIdStore } from "../../../store/states/idStore";
import { selectUser } from "../../../store/states/userSlice";

// export const runtime = "edge";

function JAF() {
  const IdStore = useSelector(selectIdStore);
  const User = useSelector(selectUser);
  const [domain, setDomain] = useState<string>("");

  const fetchEmail = async () => {
    const email = User.currentUser.email;
    if (email && email.split("@").length > 1) {
      setDomain(`@${email.split("@")[1]}`);
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
        schema={JAFSchema}
        bodyTemplate={{
          recruiter: IdStore.recruiterId,
          company: IdStore.companyId,
          domain: { domain },
        }}
        postUrl={`${process.env.NEXT_PUBLIC_IAF_JAF_BACKEND}/jaf` || ""}
      />
    </div>
  );
}

export default JAF;
