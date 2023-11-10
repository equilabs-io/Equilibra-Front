"use client";
import React from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";

export const FirstConnect = () => {
  const { isConnected } = useAccount({});
  if (!isConnected) {
    return (
      <>
        <div className="h-full flex flex-col items-center justify-center space-y-8 sm:mt-0 md:mt-24">
          <GlobeAltIcon className="h-14 w-14 text-primary" />
          <div className="text-center md:max-w-xl px-2 ">
            <h2>Sync with Innovation</h2>
          </div>
          <div className="max-w-md text-center text-grey_light">
            Connect your wallet to view your Dashboard, search and find Projects
            and Pools by address.
          </div>
        </div>
      </>
    );
  }
};
