"use client";
import React from "react";
import { useIsMounted } from "@/hooks/useIsMounted";

import SideNavBar from "@/components/SideNavBar";
import NavBar from "@/components/NavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  //TODO! CHECK if isMounted goes here ?? or another  component page ??, it is use to fix hydration error when using wagmi hooks

  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    // <div className="max-w-6x flex-auto flex flex-col relative min-h-screen">
    <>
      <div className="flex relative">
        <SideNavBar />
        <div
          className="max-w-6x flex-auto flex flex-col min-h-screen mt-11 lg:mt-0 lg:ml-[280px]
          "
        >
          <NavBar />
          <div className="flex flex-col justify-between flex-auto">
            <main className="mx-auto w-full max-w-7xl items-start justify-between py-6 lg:px-6 ">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
