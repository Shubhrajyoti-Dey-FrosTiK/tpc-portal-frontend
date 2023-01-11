import React from "react";
import RootStyleRegistry from "./emotion";
import {NavbarNested} from "../components/navbar/Navbar";
// Redux
import ReduxProvider from "./redux";

import "./globals.css";

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
          <RootStyleRegistry>
          <NavbarNested>
            
            {children}
            </NavbarNested>
            </RootStyleRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
