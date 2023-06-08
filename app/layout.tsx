"use client";
import React, { useEffect, useState } from "react";
import RootStyleRegistry from "./emotion";
import { NavbarNested } from "../components/navbar/Navbar";
import { MobileDrawer } from "../components/navbar/Drawer";
import { Analytics } from '@vercel/analytics/react';

// Redux
import ReduxProvider from "./redux";

import "./globals.css";

// Demo
import DemoNavSchema from "../demo/DemoNavSchema";

import AuthWrapper from "./auth";

export const config = {
  runtime: "edge",
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
      <Analytics />
        <ReduxProvider>
          <RootStyleRegistry>
            <AuthWrapper>
              <div className="sm:hidden">
                <MobileDrawer schema={DemoNavSchema}>
                  <div>{children}</div>
                </MobileDrawer>
              </div>
              <div className=" hidden sm:block">
                <NavbarNested schema={DemoNavSchema}>{children}</NavbarNested>
              </div>
            </AuthWrapper>
          </RootStyleRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
