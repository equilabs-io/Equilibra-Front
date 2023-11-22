"use client";
import React from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import TopNavBar from "./TopNavBar";
import { Footer } from "./Footer";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

export const FirstConnect = () => {
  const { isConnected } = useAccount({});
  if (isConnected) {
    redirect("/demo/projects");
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <TopNavBar />
        <motion.div
          className="flex-1 items-center justify-center flex"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center space-y-8 sm:mt-0 flex-1 ">
            <GlobeAltIcon className="h-14 w-14 text-primary" />
            <div className="text-center md:max-w-xl px-2 ">
              <h2>Sync with Equilibra</h2>
            </div>
            <div className="max-w-lg text-center text-grey_light">
              Connect your wallet to view your Dashboard, search and find
              Projects and Pools by address.
            </div>
          </div>
        </motion.div>
        <Footer />
      </div>
    </>
  );
};
