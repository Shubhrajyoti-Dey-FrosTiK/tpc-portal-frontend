"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Viewer from "../../../../components/form/Viewer";
import { KeyStore } from "../../../../types/Form";
import JAFSchema from "../../../../configs/JAFSchema";
import Spinner from "../../../../components/spinner/Spinner";
import { useParams, useRouter } from "next/navigation";
import { Typography, Button, Group } from "../../../../components/components";
import { useSelector } from "react-redux";
import { selectUser, setCurrentUser } from "../../../../store/states/userSlice";

// export const runtime = "edge";

function JAF() {
  const [keyStore, setKeyStore] = useState<KeyStore | null>(null);
  const [laoding, setLoading] = useState(true);
  const User = useSelector(selectUser);
  const params = useParams();

  const fetchJAFData = async () => {
    let token = "";
    if (User.currentUser) {
      token = await User.currentUser.getIdToken(true);
    }
    const url = `${process.env.NEXT_PUBLIC_IAF_JAF_BACKEND}/jaf/jaf_id`;
    console.log(url);
    const response = await axios.get(url, {
      headers: {
        jaf_id: params ? params.id : "",
        token: token,
      },
    });

    if (
      response.data &&
      response.data.data &&
      response.data.data.length &&
      response.data.data[0]["raw_key_store"].keyStore
    ) {
      setKeyStore(response.data.data[0]["raw_key_store"].keyStore);
    }
    setLoading(false);
  };

  console.log(keyStore);
  const handleJAFDownload = async () => {
    let token = "";
    if (User.currentUser) {
      token = await User.currentUser.getIdToken(true);
    }
    const url = `${process.env.NEXT_PUBLIC_IAF_JAF_BACKEND}/jaf/jaf_id/export/pdf`;
    const response = await axios.get(url, {
      headers: {
        obj_id: params ? params.id : "",
        token: token,
      },
    });

    var base64String = "data:application/pdf;base64," + response.data.data;
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    downloadLink.download = params.id + ".pdf";
    downloadLink.click();
  };

  useEffect(() => {
    fetchJAFData();
  }, []);

  return (
    <div className="max-w-[800px] m-auto pr-5 pl-5">
      {laoding && (
        <div className="h-[60vh]">
          <Spinner />
        </div>
      )}

      {!laoding && keyStore && (
        <div>
          {/* <div className="flex flex-row justify-between pb-5 pt-5">
          <Typography order={1} className="font-bold">JAF Viewer</Typography>
          <Group position="right">
            <Button color="purple" size="md" onClick={handleJAFDownload}>Download JAF</Button>
          </Group>
        </div>
       <div> */}
          <Viewer schema={JAFSchema} keyStore={keyStore} />
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default JAF;
