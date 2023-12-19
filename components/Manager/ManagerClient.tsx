"use client";
import { formatAddress } from "@/lib/format";
import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import { SupporProjects } from "../SupporProjects";
import { getUrqlClient } from "@/services/urqlService";
import { useAccount } from "wagmi";
import ManagerStats from "./ManagerStats";
import { motion } from "framer-motion";

const poolStatsQuery = `query ($currentPool: String!){
  osmoticPool(id: $currentPool) {
    address
    mimeToken {
      name
      symbol
    }
    owner
    projectList {
      name
    }
  }
  }
  `;

const ManagerClient = ({ pools }: { pools: any }) => {
  const [openManager, setOpenManager] = useState(false);
  const [currentPool, setCurrentPool] = useState("");
  const [poolStats, setPoolStats] = useState<any>([]);
  const { address: participant } = useAccount();

  useEffect(() => {
    if (currentPool !== "") {
      const fetchPoolInfoAndParticipantSupports = async () => {
        const result = await getUrqlClient().query(poolStatsQuery, {
          currentPool,
        });

        setPoolStats([
          {
            name: "Ownership",
            data:
              result.data.osmoticPool?.owner ===
              "0x5be8bb8d7923879c3ddc9c551c5aa85ad0fa4de3"
                ? "Owner"
                : "Not Owner",
          },
          {
            name: "Governance Token",
            data: result.data.osmoticPool?.mimeToken.name,
          },
          {
            name: "Management List",
            data: result.data.osmoticPool?.projectList.name,
          },
          {
            name: "Round",
            data: currentPool == "" ? "" : "1",
          },
        ]);
      };

      fetchPoolInfoAndParticipantSupports();
    }
  }, [currentPool, participant]);

  return (
    <>
      <div className="absolute left-0 top-[80%] flex w-full justify-center">
        <button
          onClick={() => setOpenManager(true)}
          className="rounded-full  px-8 py-4 text-4xl uppercase"
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
                <ManagerStats poolStats={poolStats} />
              </header>

              <div className="grid h-full grid-cols-4 gap-4 ">
                {/* Left column: claim btn + pool selection + link to docs  */}
                <motion.aside
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="cols-span-1 flex h-full flex-col items-center justify-between rounded-lg border p-4"
                >
                  <div className="w-full ">
                    <button>CLAIM</button>
                  </div>

                  <span className="sr-only">Pools Handle</span>
                  <div className="flex w-full flex-col">
                    {pools.length > 0 &&
                      pools?.map((pool: any, idx: number) => (
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
                  <div className="flex w-full flex-col text-highlight">
                    <span className="py-4">Alpha Demo v.1</span>
                    <button className="py-2 text-left">Link to Docs</button>
                  </div>
                </motion.aside>

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
