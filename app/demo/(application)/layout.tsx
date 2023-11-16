"use client";
import React from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import SideNavBar from "@/components/SideNavBar";
import NavBar from "@/components/NavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  //TODO! CHECK if isMounted goes here ?? or another  component page ??, it is use to fix hydration error when using wagmi hooks

  const { isConnected, isDisconnected } = useAccount();
  const isMounted = useIsMounted();

  //TODO! check if this is the right place to redirect
  if (!isMounted) {
    return null;
  }

  if (isDisconnected) {
    redirect("/demo");
  }

  return (
    // <div className="max-w-6x flex-auto flex flex-col relative min-h-screen">
    <>
      <motion.div className="flex relative border-2">
        <SideNavBar />
        <motion.div
          className="max-w-6x flex-auto flex flex-col min-h-screen mt-11 lg:mt-0 lg:ml-[280px]
          "
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <NavBar />
          <div className="flex flex-col justify-between flex-auto">
            <main className="mx-auto w-full max-w-7xl items-start justify-between py-6 lg:px-6">
              {children}
            </main>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
