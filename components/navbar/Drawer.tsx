"use client";
// Components
import {
  Burger,
  Drawer,
  Group,
  ScrollArea,
  createStyles,
  Navbar,
  Paper,
  Typography,
} from "../components";
import React, { useState } from "react";

//Icons
import { TablerIcon } from "@tabler/icons";

// Side bar components render
import { UserButton } from "./UserButton";
import ThemeToggle from "../theme/ThemeToggle";
import SidebarRenderer from "./SidebarRenderer";
import { Sidebar } from "../../types/Sidebar.types";
import { SearchBarMobile } from "./SearchBar";
import Image from "next/image";

import { ASSETS } from "../../constants/assets";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBotton: 0,
  },
  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },
  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

function MobileNavbarNested({ schema }: { schema: Sidebar }) {
  const { classes } = useStyles();

  return (
    <div className="flex flex-col justify-between h-[95%]">
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        {/* Links sections */}
        <div className={classes.linksInner}>
          {schema.elements.map((sidebarElement, index) => (
            <div key={`Sidebar_${index}`}>
              <SidebarRenderer basePath="/" element={sidebarElement} />
            </div>
          ))}
        </div>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        {/* Footer with user */}
        <UserButton
          image={"../../assets/logo/Logo.png"}
          name="TPC IIT-BHU"
          email="tpo@iitbhu.ac.in"
        />
      </Navbar.Section>
    </div>
  );
}

export function MobileDrawer({
  schema,
  children,
  ref,
}: {
  schema: Sidebar;
  children: React.ReactNode;
  ref: React.MutableRefObject<HTMLDivElement>;
}) {
  const [opened, setOpened] = useState(false);
  const title = opened ? "close navigation" : "open navigation";
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="lg"
      >
        <MobileNavbarNested schema={schema} />
      </Drawer>
      <Paper
        shadow={"sm"}
        className="flex justify-between flex-row flex-nowrap p-5"
      >
        <div className="flex gap-4" style={{ alignItems: "center" }}>
          <Image
            src={ASSETS.iitbhu_logo}
            alt="IIT-BHU logo"
            width={40}
            height={40}
          />
          <Typography order={3}>TPC IIT BHU</Typography>
        </div>
        {/* <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          title={title}
        /> */}
        {/* <SearchBarMobile /> */}
        <ThemeToggle />
      </Paper>
      <div id="top" ref={ref}></div>
      {children}
    </div>
  );
}
