import { useState } from "react";
import { Stepper, createStyles, getStylesRef } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
  root: {
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  separator: {
    height: 2,
    borderTop: `2px dashed ${
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4]
    }`,
    borderRadius: theme.radius.xl,
    backgroundColor: "transparent",
  },

  separatorActive: {
    borderWidth: 0,
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colors.grape[6],
      theme.colors.pink[6]
    ),
  },

  stepIcon: {
    ref: getStylesRef("stepIcon"),
    borderColor: "transparent",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.white,
    borderWidth: 0,

    "&[data-completed]": {
      borderWidth: 0,
      backgroundColor: "transparent",
      backgroundImage: theme.fn.linearGradient(
        45,
        theme.colors.grape[6],
        theme.colors.pink[6]
      ),
    },
  },

  step: {
    transition: "transform 150ms ease",

    "&[data-progress]": {
      transform: "scale(1.05)",
    },
  },
}));

export function StepperComponent({ step }: { step: number }) {
  const { classes } = useStyles();

  return (
    <Stepper classNames={classes} active={step} breakpoint="sm">
      <Stepper.Step label="Step 1" description="Fill Details" />
      <Stepper.Step label="Step 2" description="Preview Details" />
      <Stepper.Step label="Step 3" description="Submitted" />
    </Stepper>
  );
}
