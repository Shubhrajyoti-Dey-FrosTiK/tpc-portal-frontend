"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import Team from "../../components/creditcomponents/TeamComponent";
import { CreditsDataType } from "../../components/creditcomponents/TeamComponent";

const dummyData: CreditsDataType = {
  name: "Soumik Dutta",
  title: "Lead Architect",
  description:
    "Responsible for overall development of backend of the application",
  imgURL: "https://avatars.githubusercontent.com/u/78898665?v=4",
  githubURL: "",
  linkedinURL: "",
  mailID: "vishisht.dubey.phe21@itbhu.ac.in",
};

export default function Credits() {
  return (
    <div>
      <div className="mb-4">
        <Typography variant="h1">Credits</Typography>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        <div className="flex justify-center">
          <Team
            name={dummyData.name}
            title={dummyData.title}
            description={dummyData.description}
            imgURL={dummyData.imgURL}
            githubURL={dummyData.githubURL}
            linkedinURL={dummyData.linkedinURL}
            mailID={dummyData.mailID}
          />
        </div>
      </div>
    </div>
  );
}
