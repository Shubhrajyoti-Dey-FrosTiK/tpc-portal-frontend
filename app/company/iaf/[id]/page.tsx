"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Viewer from "../../../../components/form/Viewer";
import { KeyStore } from "../../../../components/form/types/Form";
import IAFSchema from "../../../../configs/IAFSchema";
import Spinner from "../../../../components/spinner/Spinner";
import { useParams, useRouter } from "next/navigation";
import { Typography } from "../../../../components/components";
import { useSelector } from "react-redux";
import { selectIdStore } from "../../../../store/states/idStore";
import { selectUser } from "../../../../store/states/userSlice";

// export const runtime = "edge";

function IAF() {
  const [keyStore, setKeyStore] = useState<KeyStore | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const User = useSelector(selectUser);

  const fetchIAFData = async () => {
    const url = `${process.env.NEXT_PUBLIC_IAF_JAF_BACKEND}/iaf/iaf_id`;
    let token = await User.currentUser.getIdToken();

    const response = await axios.get(url, {
      headers: {
        iaf_id: params ? params.id : "",
        token,
        latest: 1,
        recruiter: 1,
      },
    });

    if (response.data && response.data.data && response.data.data.length) {
      setKeyStore(response.data.data[0]["raw_key_store"].keyStore);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (User.currentUser) fetchIAFData();
  }, [User.currentUser]);

  return (
    <div className="max-w-[800px] m-auto p-10">
      {loading && (
        <div className="h-[60vh]">
          <Spinner />
        </div>
      )}

      {!loading && keyStore && (
        <>
          <Viewer schema={IAFSchema} keyStore={keyStore} />
        </>
      )}
    </div>
  );
}

export default IAF;
