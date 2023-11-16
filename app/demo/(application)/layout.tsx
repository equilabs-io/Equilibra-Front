"use client";
import React from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import SideNavBar from "@/components/SideNavBar";
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
      <motion.div className="flex relative">
        <SideNavBar />
        <div
          className="max-w-6x flex-auto flex flex-col min-h-screen mt-11 lg:mt-0 lg:ml-[280px]
          "
        >
          <TopNavBar />
          <div className="flex flex-col justify-between flex-auto">
            <motion.main
              className="mx-auto w-full max-w-7xl items-start justify-between py-6 lg:px-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.main>
          </div>
        </div>
      </motion.div>
    </>
  );
}
