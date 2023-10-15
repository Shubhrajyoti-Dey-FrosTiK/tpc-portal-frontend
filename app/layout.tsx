"use client";
import React, { useEffect, useState } from "react";
import RootStyleRegistry from "./emotion";
import { NavbarNested } from "../components/navbar/Navbar";
import { MobileDrawer } from "../components/navbar/Drawer";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/footer/Footer";
import { Affix, Transition, Button } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons";
import { useScrollIntoView, useWindowScroll } from "@mantine/hooks";

// Redux
import ReduxProvider from "./redux";

import "./globals.css";

// Demo
import DemoNavSchema from "../demo/DemoNavSchema";

import AuthWrapper from "./auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scroll, scrollTo] = useWindowScroll();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  return (
    <html lang="en-US">
      <head />
      <body>
        <Analytics />
        <ReduxProvider>
          <RootStyleRegistry>
            <AuthWrapper>
              <div className="sm:hidden">
                <MobileDrawer ref={targetRef} schema={DemoNavSchema}>
                  <div>{children}</div>
                </MobileDrawer>
                <Footer/>
              </div>
              <div className=" hidden sm:block">
                <NavbarNested ref={targetRef} schema={DemoNavSchema}>
                  {children}
                </NavbarNested>
                <Footer/>
              </div>
            </AuthWrapper>
          </RootStyleRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
