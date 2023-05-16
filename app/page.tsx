"use client";
import dynamic from "next/dynamic";

import DemoSchema from "../demo/DemoSchema";
import { useDisclosure } from "@mantine/hooks";
import {
  Typography,
  Menu,
  Button,
  Tabs,
  Paper,
  Modal,
  TabsProps,
  Group,
} from "../components/components";
import { useRouter } from "next/navigation";

const Form = dynamic(() => import("../components/form/Form"), {
  loading: () => <h1>Loading</h1>,
});

export interface FormInterface {
  title: string;
  goTo: string;
  description?: string;
}

export const config = {
  runtime: "experimental-edge",
};

const formTypes: Array<FormInterface> = [
  {
    title: "Internship Announcement Form (IAF)",
    description:
      "Fill this form to hire interns from IIT BHU for 2025 graduating students",
    goTo: "/company/iaf",
  },
  {
    title: "Job Announcement Form (JAF)",
    description:
      "Fill this form to hire full time candidates from IIT BHU for 2024 graduating students",
    goTo: "/company/jaf",
  },
];

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const formList = [
    {
      title: "Software Engineer",
      purpose: "Internship",
      dateFiled: "29th May, 2023",
    },
  ];

  return (
    <main>
      <div className="max-w-[800px] m-auto">
        <div className="m-5">
          <Typography order={1}>Recruiter Dashboard</Typography>
          <Typography order={5} className="font-light">
            Find all the <b>Internship Announcement Form (IAF)</b> and{" "}
            <b>Job Announcement Form</b> you have filled in one place.
          </Typography>
          <Modal
            className="rounded-md"
            opened={opened}
            onClose={close}
            styles={{ modal: { borderRadius: 10 } }}
            centered
            size="xl"
          >
            <Typography className="ml-10" order={3}>
              Choose the form you want to fill
            </Typography>
            {formTypes.map((form, formIndex) => (
              <a
                key={`Form_${formIndex}`}
                href={form.goTo}
                target="_blank"
                rel="noreferrer"
              >
                <Paper className="shadow-lg p-5 m-10 cursor-pointer rounded-md">
                  <Typography order={4}>{form.title}</Typography>
                  <Typography order={5} className="font-light">
                    {form.description}
                  </Typography>
                </Paper>
              </a>
            ))}
          </Modal>

          <div className="flex justify-between mt-10 items-center">
            <Typography order={4}>
              Total {formList.length} form(s) filled
            </Typography>
            <Button
              color="purple"
              ripple={true}
              aria-hidden={true}
              onClick={open}
            >
              + Fill Form
            </Button>
          </div>

          <Tabs color="purple" defaultValue="all">
            <Tabs.List>
              <Tabs.Tab value="all">ALL</Tabs.Tab>
              <Tabs.Tab value="iaf">IAF</Tabs.Tab>
              <Tabs.Tab value="jaf">JAF</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="all" pt="xs">
              <Tabs
                color="purple"
                defaultValue="2022-23"
                orientation="vertical"
              >
                <Tabs.List>
                  <Tabs.Tab value="2022-23">2022-23</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="2022-23" pl="xs">
                  <div className="max-h-[70vh] overflow-scroll">
                    {formList.map((form, formIndex) => {
                      return (
                        <Paper
                          key={`Form_${formIndex}`}
                          className="m-2 p-5 rounded-md shadow-md"
                        >
                          <Typography order={5}>{form.title}</Typography>
                          <Typography order={6} className="font-normal">
                            {form.purpose}
                          </Typography>
                          <Typography order={6} className="font-light">
                            Form filled: {form.dateFiled}
                          </Typography>
                        </Paper>
                      );
                    })}
                  </div>
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>

            <Tabs.Panel value="iaf" pt="xs">
              Messages tab content
            </Tabs.Panel>

            <Tabs.Panel value="jaf" pt="xs">
              Settings tab content
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
