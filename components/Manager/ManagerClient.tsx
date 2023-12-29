"use client";
import { formatAddress } from "@/lib/format";
import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import { SupporProjects } from "../SupporProjects";
import { getUrqlClient } from "@/services/urqlService";
import { useAccount } from "wagmi";
import ManagerStats from "./ManagerStats";
import { motion } from "framer-motion";
import MIME_TOKEN_ABI from "@/constants/abis/MimeToken.json";
import { Chart } from "../Chart";

const poolStatsQuery = `query ($currentPool: String!){
  osmoticPool(id: $currentPool) {
    address
    mimeToken {
      id
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
  const [govTokenAddress, setGovTokenAddress] = useState("");

  // current connected address
  const { address: participant } = useAccount();

  //fetch pool stats
  useEffect(() => {
    if (currentPool !== "") {
      const fetchPoolStats = async () => {
        const result = await getUrqlClient().query(poolStatsQuery, {
          currentPool,
        });

        setPoolStats([
          {
            name: "Ownership",
            data:
              result.data.osmoticPool?.owner === participant ? "Not" : "Owner",
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
        setGovTokenAddress(result.data.osmoticPool?.mimeToken.id);
      };

      fetchPoolStats();
    }
  }, [currentPool, participant]);

  return (
    <>
      <div className="absolute left-0 top-[80%] flex w-full justify-center">
        {/* opens the manager */}
        <button
          onClick={() => setOpenManager(true)}
          className="rounded-full  px-8 py-4 text-4xl uppercase"
        >
          open Manager
        </button>
      </div>
      {/* then manager is open... */}
      {openManager && (
        <>
          <div className="absolute inset-x-0 inset-y-4 mt-24 flex bg-background">
            {/* manualy close the manajer */}
            {/* TODO: delete */}
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
                  {/* claim voting power */}

                  <Claimbutton govTokenAddress={govTokenAddress} />

                  {/* pool selection + chart  */}
                  <SelectedPoolAndChart
                    pools={pools}
                    setCurrentPool={setCurrentPool}
                    currentPool={currentPool}
                  />

                  <div className="text-textSecoondary flex w-full flex-col">
                    <span className="py-4">Alpha Demo v.1</span>
                    {/* TODO: add href to docs */}
                    <a href="#" target="_blank">
                      <button className="py-2 text-left">Link to Docs</button>
                    </a>
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

type SelectedPoolAndChartProps = {
  pools: [any];
  setCurrentPool: (arg0: string) => void;
  currentPool: string;
};

const SelectedPoolAndChart = ({
  pools,
  setCurrentPool,
  currentPool,
}: SelectedPoolAndChartProps) => {
  return (
    <>
      <div className="flex w-full flex-col border">
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
        <Chart maxValue={500} currentValue={300} />
        <div className="mt-20 truncate">
          Current Pool: {formatAddress(currentPool)}
        </div>
      </div>
    </>
  );
};

type ClaimbuttonProps = {
  govTokenAddress?: string;
};

// TODO: add claim voting power functionality
const Claimbutton = ({ govTokenAddress }: ClaimbuttonProps) => {
  const [isClaimed, setIsClaimed] = useState(false);
  return (
    <>
      <div className="flex w-full justify-center">
        {isClaimed ? (
          <span className="text-textSecondary">
            Power Claimed for this pool
          </span>
        ) : (
          <button className="relative rounded-full border px-4 py-2 hover:border-primary">
            Claim Voting Power
            <span className="absolute -top-1 right-1 flex h-3 w-3 ">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
          </button>
        )}
      </div>
    </>
  );
};
