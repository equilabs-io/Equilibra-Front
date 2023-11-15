"use client";
import React from "react";
import { useAccount } from "wagmi";
import { motion, animate } from "framer-motion";
import { redirect } from "next/navigation";
import NavBar from "./NavBar";
import { Footer } from "./Footer";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

export const FirstConnect = () => {
  const { isConnected } = useAccount({});

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* <NavBar /> */}
      {!isConnected && (
        <>
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
          <Footer />
        </>
      )}
    </motion.div>
  );
};
