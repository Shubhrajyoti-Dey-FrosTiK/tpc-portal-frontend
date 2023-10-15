"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import Team from "../../components/creditcomponents/TeamComponent";
import { CreditsDataType } from "../../components/creditcomponents/TeamComponent";
import { dummyData } from "../../configs/creditPeople";

export default function Credits() {
  return (
    <div className="border-1 border-purple-500 m-5 grid justify-center">
      <div className="mb-4">
        <Typography variant="h1">Team Frostik</Typography>
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
              mailID={value.mailID}
              key={key}
            />
          ))}
      </div>
      <div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
