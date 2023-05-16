"use client";

import React from "react";
import { Switch, Group, useMantineTheme } from "../components";
import { IconSun, IconMoonStars } from "@tabler/icons";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme, Theme } from "../../store/states/themeSlice";

function ThemeToggle() {
  const dispatch = useDispatch();
  const ThemeContext = useSelector(selectTheme);
  const theme = useMantineTheme();
  return (
    <div style={{ alignSelf: "center" }}>
      <Group position="center">
        <Switch
          checked={ThemeContext.theme === Theme.DARK}
          size="lg"
          color={ThemeContext.theme === Theme.DARK ? "gray" : "dark"}
          onLabel={
            <IconSun size={20} stroke={2.5} color={theme.colors.yellow[4]} />
          }
          onChange={() => {
            dispatch(toggleTheme());
          }}
          offLabel={
            <IconMoonStars
              size={20}
              stroke={2.5}
              color={theme.colors.blue[6]}
            />
          }
        />
      </Group>
    </div>
  );
}

export default ThemeToggle;
