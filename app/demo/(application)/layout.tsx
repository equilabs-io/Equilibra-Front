"use client";
import React from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import TopNavBar from "@/components/TopNavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  //TODO! CHECK if isMounted goes here ?? or another  component page ??, it is use to fix hydration error when using wagmi hooks

  const { isConnected, isDisconnected } = useAccount();

  //TODO! check if this is the right place to redirect
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }

  if (isDisconnected) {
    redirect("/demo");
  }

  return (
    // <div className="max-w-6x flex-auto flex flex-col relative min-h-screen">
    <>
      <motion.div className="relative flex">
        {/* <SideNavBar /> */}
        <div
          className="max-w-6x mt-11 flex min-h-screen flex-auto flex-col lg:mt-0
          "
        >
          <TopNavBar />
          <div className="flex flex-auto flex-col justify-between">
            <motion.main
              className="mx-auto my-6 w-full max-w-7xl items-start justify-between px-2"
              // TODO! check if this animation is needed and why it renders the page below than espected
              // initial={{ opacity: 0, scale: 0 }}
              // animate={{ opacity: 1, scale: 1 }}
              // transition={{ duration: 0.5 }}
            >
              {children}
            </motion.main>
          </div>
        </div>
      </motion.div>
    </>
  );
}
