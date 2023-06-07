"use client";
import React, { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useSelector } from "react-redux";
import { ProfileLink, selectResume } from "../../../store/states/resumeSlice";
import { Avatar, Paper, Typography } from "../../../components/components";

function Page() {
  const [markdown, setMarkdown] = useState("");
  const { resumeFields } = useSelector(selectResume);


  return (
    <div>
      <div className="m-5">
        <Typography order={2}>Resume Fields</Typography>
        <Typography order={5} className="font-light">
          Add resume fields here in the respective sections in order to add it
          to the resume in the resume creation page.
        </Typography>
      </div>

      {/* Profile Links  */}
      <div className="m-5">
        <Typography order={3} className="mb-5">
          Profile Links
        </Typography>
        {resumeFields.profileLinks.map(
          (profileLink: ProfileLink, linkIdex: number) => {
            return (
              <Paper
                key={`Link_${linkIdex}`}
                className="m-2 p-5 rounded-md shadow-md"
              >
                <Avatar src={profileLink.icon} />
                <Typography order={5}>{profileLink.link.linkText}</Typography>
                <Typography order={6} className="font-light">
                  {profileLink.link.linkURL}
                </Typography>
              </Paper>
            );
          }
        )}
      </div>

      <MarkdownEditor
        toolbars={["undo", "redo", "bold", "italic", "underline", "link"]}
        value={markdown}
        visible={true}
        style={{
          minHeight: "100px",
        }}
        enableScroll={true}
      />
    </div>
  );
}

export default Page;
