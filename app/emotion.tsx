"use client";
import { CacheProvider } from "@emotion/react";
import { useEmotionCache, MantineProvider, useMantineTheme } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";

import { ThemeProvider } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { selectTheme, Theme } from "../store/states/themeSlice";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useEmotionCache();
  cache.compat = true;

  const { theme } = useSelector(selectTheme);
  const mantineTheme = useMantineTheme()

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Verdana, sans-serif",
          fontFamilyMonospace: "Monaco, Courier, monospace",
          headings: { fontFamily: "Greycliff CF, sans-serif" },
          colorScheme: theme == Theme.DARK ? "dark" : "light",
          primaryColor: "grape",
        }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </MantineProvider>
    </CacheProvider>
  );
}
