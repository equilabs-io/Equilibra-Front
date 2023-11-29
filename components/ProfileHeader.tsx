"use client";
import React from "react";
import { useAccount } from "wagmi";

export const ProfileHeader = () => {
  const { address, isConnected } = useAccount();
  return (
    <>
      <header>
        <div className="grid grid-cols-3">
          <div className="relative  lg:py-2 col-span-2  space-y-8">
            <h2 className="font-bold md:text-7xl lg:w-full text-surface_var pt-10">
              Manage your Pools, Projects and more
            </h2>
            <p className="text-textSecondary text-lg">Brief description here</p>
          </div>
          <div className="flex items-center justify-start gap-x-8 gap-y-4 bg-background rounded-xl py-6 px-4 ">
            <img
              className="rounded-full"
              src={`https://effigy.im/a/${address}.png`}
              height={100}
              width={100}
            />
            <div className="overflow-hidden truncate bg-surface w-full py-2">
              <h4 className="text-gray_mdark font-mono truncate">{address}</h4>
              <h6 className="text-xs text-slate-500">
                {isConnected ? "Connected" : "Connect to Continue"}
              </h6>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
