"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import Team from "../../components/creditcomponents/TeamComponent";
import { CreditsDataType } from "../../components/creditcomponents/TeamComponent";

const dummyData: Array<CreditsDataType> = [
  {
    name: "Soumik Dutta",
    title: "Lead Architect",
    description:
      "Responsible for overall development of backend of the application an intern in  a sprinkler bhaiya is OP super cool yayy",
    imgURL: "https://avatars.githubusercontent.com/u/78898665?v=4",
    githubURL: "",
    linkedinURL: "",
    mailID: "vishisht.dubey.phe21@itbhu.ac.in",
  },
  {
    name: "Soumik Dutta",
    title: "Lead Architect",
    description:
      "Responsible for overall development of backend of the application an intern in  a sprinkler bhaiya is OP super cool yayy",
    imgURL: "https://avatars.githubusercontent.com/u/78898665?v=4",
    githubURL: "",
    linkedinURL: "",
    mailID: "vishisht.dubey.phe21@itbhu.ac.in",
  },
  {
    name: "Soumik Dutta",
    title: "Lead Architect",
    description:
      "Responsible for overall development of backend of the application an intern in  a sprinkler bhaiya is OP super cool yayy",
    imgURL: "https://avatars.githubusercontent.com/u/78898665?v=4",
    githubURL: "",
    linkedinURL: "",
    mailID: "vishisht.dubey.phe21@itbhu.ac.in",
  },
  {
    name: "Soumik Dutta",
    title: "Lead Architect",
    description:
      "Responsible for overall development of backend of the application an intern in  a sprinkler bhaiya is OP super cool yayy",
    imgURL: "https://avatars.githubusercontent.com/u/78898665?v=4",
    githubURL: "",
    linkedinURL: "",
    mailID: "vishisht.dubey.phe21@itbhu.ac.in",
  },
];

export default function Credits() {
  return (
    <div>
      <div className="mb-4">
        <Typography variant="h1">Credits</Typography>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {dummyData &&
          dummyData.map((value: CreditsDataType, key: any) => (
            <Team
              name={value.name}
              title={value.title}
              description={value.description}
              imgURL={value.imgURL}
              linkedinURL={value.linkedinURL}
              githubURL={value.githubURL}
              key={key}
            />
          ))}
      </div>
    </div>
  );
}
