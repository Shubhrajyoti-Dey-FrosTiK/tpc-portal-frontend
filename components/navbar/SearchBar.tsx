// Text elements and Hooks
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
// Tabler Icons
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";

// For Desktop Version
export function SearchBarDesktop(props: TextInputProps) {
  const theme = useMantineTheme();
  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="xs"
      style={{ width: "100%", alignSelf: "center" }}
      rightSection={
        <ActionIcon
          size={32}
          radius="lg"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight
              size={18}
              stroke={1.5}
              style={{ backgroundColor: "grey" }}
            />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search Bar"
      rightSectionWidth={42}
      {...props}
    />
  );
}
//For Mobile Version
export function SearchBarMobile(props: TextInputProps) {
  const theme = useMantineTheme();
  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="xs"
      style={{ flexWrap: "nowrap" }}
      rightSection={
        <ActionIcon
          size="sm"
          radius="lg"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search Bar"
      rightSectionWidth={42}
      {...props}
    />
  );
}
