"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Viewer from "../../../../../components/form/Viewer";
import { KeyStore } from "../../../../../types/Form";
import IAFSchema from "../../../../../configs/IAFSchema";
import Spinner from "../../../../../components/spinner/Spinner";
import { useParams, useRouter } from "next/navigation";
import Form from "../../../../../components/form/Form";
import { Badge } from "@mantine/core";

function IAF() {
  const [keyStore, setKeyStore] = useState<KeyStore | null>(null);
  const [laoding, setLoading] = useState(true);
  const params = useParams();

  const fetchIAFData = async () => {
    const url = `${process.env.NEXT_PUBLIC_IAF_JAF_BACKEND}/iaf/iaf_id`;
    console.log(url);
    const response = await axios.get(url, {
      headers: {
        obj_id: params ? params.id : "",
      },
    });

    console.log(response.data);

    if (
      response.data &&
      response.data.data &&
      response.data.data["raw_key_store"] &&
      response.data.data["raw_key_store"].keyStore
    ) {
      setKeyStore(response.data.data["raw_key_store"].keyStore);
    }
    setLoading(false);
  };

  console.log(keyStore);

  useEffect(() => {
    fetchIAFData();
  }, []);

  return (
    <div className="max-w-[800px] m-auto p-10">
      {laoding && (
        <div className="h-[60vh]">
          <Spinner />
        </div>
      )}

      {!laoding && keyStore && (
        <>
          <Badge size="xl">EDITTING</Badge>
          <Form
            postUrl={`${process.env.NEXT_PUBLIC_IAF_JAF_BACKEND}/iaf` || ""}
            schema={IAFSchema}
            edit={{ keyStore }}
          />
        </>
      )}
    </div>
  );
}

export default IAF;
