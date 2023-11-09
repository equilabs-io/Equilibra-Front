"use client";
import React from "react";
import { useAccount } from "wagmi";

export const ProfileHeader = () => {
  const { address, isConnected } = useAccount();
  return (
    <>
      <header>
        <div className="flex items-center justify-start gap-x-8 gap-y-4 bg-gray-700/10 rounded-xl py-6 px-4">
          <img
            className="rounded-full"
            src={`https://effigy.im/a/${address}.png`}
            height={100}
            width={100}
          />
          <div className="">
            <h4 className="text-gray_mdark font-mono">{address}</h4>
            <h6 className="text-xs text-slate-500">
              {isConnected ? "Connected" : "Connect to Continue"}
            </h6>
          </div>
        </div>
      </header>
    </>
  );
};
