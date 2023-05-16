import React, { useState } from "react";

// Types
import {
  SidebarElement,
  SidebarElementType,
  SidebarNested,
} from "../../types/Sidebar.types";

// Components
import {
  Text,
  createStyles,
  UnstyledButton,
  Group,
  ThemeIcon,
  Collapse,
  Box,
} from "../components";

// Icons
import {
  TablerIcon,
  IconChevronLeft,
  IconChevronRight,
  IconDeviceLaptop,
} from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

function SidebarRenderer({
  element,
  basePath,
}: {
  element: SidebarElement | SidebarNested;
  basePath: string;
}) {
  const { classes, theme } = useStyles();
  const [open, setOpen] = useState(false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const Icon = element.icon;

  if (element.type === SidebarElementType.ELEMENT) {
    return (
      <UnstyledButton className={classes.control}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {element.icon ? (
            <ThemeIcon variant="light" size={30}>
              {/*@ts-ignore */}
              <Icon />
            </ThemeIcon>
          ) : (
            <Box className="w-[30px]"></Box>
          )}
          <Box ml="md">
            {element.linkTo ? (
              <Link href={`${basePath}${element.key}`}>{element.label}</Link>
            ) : (
              <Text>{element.label}</Text>
            )}
          </Box>
        </Box>
      </UnstyledButton>
    );
  } else {
    return (
      <>
        <UnstyledButton
          onClick={() => setOpen((open) => !open)}
          className={classes.control}
        >
          <Group position="apart" spacing={0}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                {/*@ts-ignore */}
                <Icon />
              </ThemeIcon>
              <Box ml="md">
                {element.linkTo ? (
                  <Link
                    href={`${basePath}${element.key}`}
                    className="flex flex-row"
                  >
                    {element.label}
                  </Link>
                ) : (
                  element.label
                )}
              </Box>
            </Box>
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: open
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          </Group>
        </UnstyledButton>
        <Collapse in={open}>
          <div className="ml-6" style={{
            borderLeft: `1px solid ${theme.colorScheme == "dark" ? theme.colors.gray[8] : theme.colors.dark[0]}`
          }}>
            {element.nested.map((eachElement, index) => (
              <SidebarRenderer
                key={`${element.key}_${index}`}
                element={eachElement}
                basePath={`${basePath}${element.key}/`}
              />
            ))}
          </div>
        </Collapse>
      </>
    );
  }
}

export default SidebarRenderer;





