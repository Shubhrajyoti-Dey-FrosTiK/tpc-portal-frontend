"use client";

// Converting Mantine to Client Components
import {
  TextInput,
  Title as Typography,
  Input,
  Textarea,
  NumberInput,
  Group,
  UnstyledButton,
  UnstyledButtonProps,
  Avatar,
  Text,
  createStyles,
  Navbar,
  Code,
  ScrollArea,
  Box,
  Collapse,
  ThemeIcon,
} from "@mantine/core";

// Switching to Material Tailwind if Mantine is not good
import { Button } from "@material-tailwind/react";
import { MantineLogo } from "@mantine/ds";
import { NavbarNested } from "./navbar/Navbar";
export {
  TextInput,
  Typography,
  Button,
  Input,
  Textarea,
  NumberInput,
  Group,
  MantineLogo,
  NavbarNested,
  UnstyledButton,
  Avatar,
  Text,
  Navbar,
  Code,
  ScrollArea,
  Box,
  Collapse,
  ThemeIcon,
  createStyles,
};

export type { UnstyledButtonProps };
