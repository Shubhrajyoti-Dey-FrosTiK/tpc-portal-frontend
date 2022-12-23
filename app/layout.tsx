import React from "react";
import RootStyleRegistry from "./emotion";

// Redux
import ReduxProvider from "./redux";

import "./globals.css";

export const config = {
  runtime: "experimental-edge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <ReduxProvider>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
