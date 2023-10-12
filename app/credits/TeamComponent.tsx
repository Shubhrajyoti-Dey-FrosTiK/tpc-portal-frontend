"use client";
import React, { useState } from "react";
import {
  Card,
  Image,
  Group,
  Text,
  Badge,
  Button,
  Timeline,
} from "../../components/components";
import { Typography } from "@material-tailwind/react";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconBrandGmail,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
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
      {/* <div className="p-2">
        <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item
            bullet={<IconGitBranch size={12} />}
            title="New branch"
          >
            <Text c="dimmed" size="sm">
              You&apos;ve created new branch{" "}
              <Text variant="link" component="span" inherit>
                fix-notifications
              </Text>{" "}
              from master
            </Text>
            <Text size="xs" mt={4}>
              2 hours ago
            </Text>
          </Timeline.Item>

          <Timeline.Item bullet={<IconGitCommit size={12} />} title="Commits">
            <Text c="dimmed" size="sm">
              You&apos;ve pushed 23 commits to
              <Text variant="link" component="span" inherit>
                fix-notifications branch
              </Text>
            </Text>
            <Text size="xs" mt={4}>
              52 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Pull request"
            bullet={<IconGitPullRequest size={12} />}
            lineVariant="dashed"
          >
            <Text c="dimmed" size="sm">
              You&apos;ve submitted a pull request
              <Text variant="link" component="span" inherit>
                Fix incorrect notification message (#187)
              </Text>
            </Text>
            <Text size="xs" mt={4}>
              34 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Code review"
            bullet={<IconMessageDots size={12} />}
          >
            <Text c="dimmed" size="sm">
              <Text variant="link" component="span" inherit>
                Robert Gluesticker
              </Text>{" "}
              left a code review on your pull request
            </Text>
            <Text size="xs" mt={4}>
              12 minutes ago
            </Text>
          </Timeline.Item>
        </Timeline>
      </div> */}
    </div>
  );
}
