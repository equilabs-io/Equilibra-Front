"use client";

import React from "react";
import { formatAddress } from "@/lib/format";
import { useAccount } from "wagmi";

export const ProfileHeader = () => {
  const { address: participant } = useAccount();
  return (
    <>
      <header>
        <div className="container mx-auto grid grid-cols-3 px-6 pb-32 pt-32 md:px-12 lg:px-7 lg:pb-[4.8rem] lg:pt-[4.8rem]">
          <div className="relative  col-span-2 space-y-8  lg:py-28 ">
            <h2 className="font-semibold text-surface_var md:text-7xl lg:w-full ">
              Manage your Pools, Projects and more
            </h2>
            <p className="text-lg font-thin text-textSecondary">
              Bring your organization ecosystem to the next level by managing
              all your proyects. Claim your voting power and support projects,
              activate them and more.
            </p>
          </div>
          {/* TODO: improve this section styles and data */}
          <div className="flex flex-col rounded-xl  bg-background px-4 py-6">
            {/* <div className="truncat overflow-hidden bg-surface">
                <span className="text-gray_mdark truncate">
                  {formatAddress(participant)}
                </span>
              </div>
              <img
                className="rounded-full"
                src={`https://effigy.im/a/${participant}.png`}
                height={40}
                width={40}
              /> */}

            {/* stats -mock data for now */}

            <div className="peer flex h-full w-full flex-col justify-between">
              {stats.map((item) => (
                <div className="group flex items-center justify-between rounded-lg bg-surface px-4 py-8  ">
                  <span className="text-lg text-surface_var transition-all duration-300 ease-in-out group-hover:scale-90">
                    {item.name}
                  </span>
                  {/* <span className="text-3xl text-primary transition-all duration-300 ease-in-out group-hover:scale-125 ">
                    {item.stat}
                  </span> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const stats = [
  { name: "Check your Support Given", stat: "450" },
  { name: "Pool Ownership", stat: "2" },
  { name: "Staking in Projects", stat: "4" },
  // { name: "Activate Projects", stat: "4" },
];
