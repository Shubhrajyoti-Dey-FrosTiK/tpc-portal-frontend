"use client";
import React from "react";
import { Card, Image, Text } from "@mantine/core";
import { selectTheme, Theme } from "../../../store/states/themeSlice";
import { useSelector } from "react-redux";
const CreditComponent = (props: any) => {
  const { theme } = useSelector(selectTheme);
  return (
    <div className="p-4 h-40">
      {theme == Theme.DARK ? (
        <div className="flex align-middle">
          <div style={{ marginRight: "1rem" }}>
            <Image
              src={props.imgUrl}
              alt="Profile Image"
              height={80}
              width={80}
              radius="md"
            />
          </div>
          <div>
            <Text weight={500} color="white" size="xl" className="font-bold">
              {props.name}
            </Text>
            <Text size="md" color="white" className="font-bold">
              {props.position}
            </Text>
            <a href={props.github} target="_blank" rel="noopener noreferrer">
              <Text size="md" color="white" className="font-bold">
                GitHub
              </Text>
            </a>
          </div>
        </div>
      ) : (
          <div className="flex align-middle">
            <div style={{ marginRight: "1rem" }}>
              <Image
                src={props.imgUrl}
                alt="Profile Image"
                height={80}
                width={80}
                radius="md"
              />
            </div>
            <div>
              <Text weight={500} color="black" size="xl" className="font-bold">
                {props.name}
              </Text>
              <Text size="md" color="black" className="font-bold">
                {props.position}
              </Text>
              <a href={props.github} target="_blank" rel="noopener noreferrer">
                <Text size="md" color="black" className="font-bold">
                  GitHub
                </Text>
              </a>
            </div>
          </div>
      )}
    </div>
  );
};

export default function Page() {
  const { theme } = useSelector(selectTheme);
  return (
    <div className="overflow-hidden" id="vishsiht">
      {theme == Theme.DARK ? (
        <p className="flex justify-center font-extrabold text-4xl text-white">
          Team Frostik
        </p>
      ) : (
        <p className="flex justify-center font-extrabold text-4xl text-black">
          Team Frostik
        </p>
      )}
      <CreditComponent
        name="Shubhrajyoti Dey"
        position="Lead Full Stack Developer and Architect"
        github="https://github.com/Shubhrajyoti-Dey-FrosTiK"
        imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4K-JhRxJGZvqHhSDGV3SwBUPeZkMSIh6DlPtzqQuiuxnlKaPp1VVrlfYlZ10GGudcSI&usqp=CAU"
      />
      <CreditComponent
        name="Soumik Dutta"
        position="Senior Backend Developer and Architect"
        github="https://github.com/shalearkane"
        imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4K-JhRxJGZvqHhSDGV3SwBUPeZkMSIh6DlPtzqQuiuxnlKaPp1VVrlfYlZ10GGudcSI&usqp=CAU"
      />
      <CreditComponent
        name="Vishisht Dubey"
        position="Frontend Developer"
        github="https://github.com/vishisht-dubey"
        imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4K-JhRxJGZvqHhSDGV3SwBUPeZkMSIh6DlPtzqQuiuxnlKaPp1VVrlfYlZ10GGudcSI&usqp=CAU"
      />
      <CreditComponent
        name="Chirag Goel"
        position="Frontend Developer"
        github="https://github.com/chiggshiggs/chiggshiggs"
        imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4K-JhRxJGZvqHhSDGV3SwBUPeZkMSIh6DlPtzqQuiuxnlKaPp1VVrlfYlZ10GGudcSI&usqp=CAU"
      />
    </div>
  );
}
