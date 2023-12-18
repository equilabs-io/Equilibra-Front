"use client";
import { formatAddress } from "@/lib/format";
import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import { SupporProjects } from "../SupporProjects";

const ManagerClient = ({ pools }: { pools: any }) => {
  const [openManager, setOpenManager] = useState(false);
  const [currentPool, setCurrentPool] = useState("");

  const filteredPools = pools
    .filter((pool: any) => pool.address === currentPool)
    .map((pool: any) => pool.poolProjects);

  console.log("filteredPools", filteredPools);

  return (
    <>
      <div className="absolute left-0 top-[80%] flex w-full justify-center">
        <button
          onClick={() => setOpenManager(true)}
          className="rounded-full border px-8 py-4 text-4xl uppercase"
        >
          open Manager
        </button>
      </div>
      {openManager && (
        <>
          <div className="absolute inset-x-0 inset-y-4 mt-24 flex bg-background">
            <button
              onClick={() => setOpenManager(false)}
              className="absolute right-5 top-5 z-50 rounded-full px-2 py-2 text-xl uppercase text-textSecondary "
            >
              X
            </button>

            <div className="flex w-full flex-col gap-4 px-4">
              {/* Top Section: pool stats */}
              <header className="">
                <ManagerStats />
              </header>

              <div className="grid h-full grid-cols-4 gap-4 ">
                {/* Left column: claim btn + pool selection + link to docs  */}
                <aside className="cols-span-1 flex h-full flex-col items-center justify-between rounded-lg border-2 p-4">
                  <div className="w-full border">
                    <button>CLAIM</button>
                  </div>

                  <span className="sr-only">Pools Handle</span>
                  <div className="flex w-full flex-col border">
                    {pools.length > 0 &&
                      pools.slice(-2)?.map((pool: any, idx: number) => (
                        <>
                          <button
                            className="truncate py-2 text-left text-textSecondary hover:bg-surface hover:text-white"
                            key={idx}
                            onClick={() => setCurrentPool(pool.address)}
                          >
                            <p className="text-sm text-textSecondary">
                              {formatAddress(pool.address)}
                            </p>
                          </button>
                        </>
                      ))}
                    <div className="mt-20 truncate">
                      Current Pool: {formatAddress(currentPool)}
                    </div>
                  </div>
                  <div className="flex w-full flex-col border">
                    <span className="py-4">Alpha Demo v.1</span>
                    <button className="py-2 text-left">Link to Docs</button>
                  </div>
                </aside>

                {/* Main section: vote inputs + and chart + checkout */}
                <div className="items-start-2 col-start-2 col-end-5 h-full w-full">
                  <main className=" h-full w-full flex-1 p-2">
                    <Suspense>
                      <SupporProjects pool={currentPool} />
                    </Suspense>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ManagerClient;

const stats = [
  { name: "Ownership", value: "Owner" },
  { name: "Gov Token", value: "Fede Token", unit: "" },
  { name: "Management list", value: "Peepo" },
  { name: "Round ", value: "1" },
];
function ManagerStats() {
  return (
    <div className="w-full bg-background">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="group rounded-lg  bg-surface px-1 py-2 sm:px-6 lg:px-8"
            >
              <p className="text-xs font-medium leading-6 text-textSecondary">
                {stat.name}
              </p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-xl font-semibold tracking-tight text-white">
                  {stat.value}
                </span>
                {stat.unit ? (
                  <span className="text-sm text-textSecondary">
                    {stat.unit}
                  </span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
