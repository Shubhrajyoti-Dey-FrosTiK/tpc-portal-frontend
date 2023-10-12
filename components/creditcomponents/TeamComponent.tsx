"use client";
import React from "react";
import {
  Card,
} from "../components";
import { Typography } from "@material-tailwind/react";
import {
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconBrandGmail,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
// import Progress from "./Timeline";
export interface CreditsDataType {
  [key: string]: string;
}

export default function Team(props: CreditsDataType) {
  const router = useRouter();
  return (
    <div>
      <Card
        className="flex flex-col justify-center cursor-pointer sm:w-auto w-80 p-4 gap-4"
        shadow="sm"
        radius="lg"
        withBorder
      >
        <div className="flex justify-center">
          <img
            src={props.imgURL}
            alt="Your Image"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        <div>
          <div className="mt-3">
            <Typography variant="h3">{props.name}</Typography>
            <Typography>{props.title}</Typography>
          </div>
          <div className="flex flex-row">
            <IconBrandGithubFilled
              className="pr-3"
              size={40}
              onClick={() => {
                router.push(`${props.githubURL}`);
              }}
            />
            <IconBrandLinkedin
              className="pr-3"
              size={40}
              onClick={() => {
                router.push(`${props.linkedinURL}`);
              }}
            />
            <a href={`mailto:${props.mailID}`}>
              <IconBrandGmail className="pr-3" size={40} />
            </a>
          </div>
          <div>
            <Typography>{props.description}</Typography>
          </div>
        </div>
      </Card>
      {/*  */}
      {/* <Progress/> */}
    </div>
  );
}
