"use client";

// Converting Mantine to Client Components
import {
  Switch,
  Select,
  Alert,
  Tabs,
  Modal,
  Paper,
  Menu,
  useMantineTheme,
  TextInput,
  Title as Typography,
  Input,
  Textarea,
  NumberInputHandlers,
  ActionIcon,
  Center,
  useMantineColorScheme,
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
  SimpleGrid,
  ThemeIcon,
  Burger,
  Checkbox,
  Radio,
  SelectProps,
  Drawer,
  TabsProps,
  PasswordInput,
  Card,
  Badge,
  Image,
  Timeline,
  Anchor
} from "@mantine/core";

import {
  Dropzone,
  DropzoneProps,
  MIME_TYPES,
  FileWithPath,
} from "@mantine/dropzone";

import {
  showNotification
} from "@mantine/notifications";

// Switching to Material Tailwind if Mantine is not good
import { Button } from "@material-tailwind/react";
import { MantineLogo } from "@mantine/ds";
import { NavbarNested } from "./navbar/Navbar";
import {
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconBrandGmail,
} from "@tabler/icons-react";
export {
  Switch,
  Typography,
  MIME_TYPES,
  Dropzone,
  Checkbox,
  Button,
  SimpleGrid,
  Select,
  Input,
  useMantineTheme,
  Tabs,
  Textarea,
  NumberInput,
  Alert,
  Paper,
  ActionIcon,
  Center,
  useMantineColorScheme,
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
  Menu,
  ThemeIcon,
  createStyles,
  Burger,
  Drawer,
  Radio,
  Modal,
  TextInput,
  PasswordInput,
  Card,
  Image,
  Badge,
  Timeline,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconBrandGmail,
  Anchor,
  showNotification
};

export type {
  UnstyledButtonProps,
  NumberInputHandlers,
  SelectProps,
  DropzoneProps,
  FileWithPath,
  TabsProps,
};
