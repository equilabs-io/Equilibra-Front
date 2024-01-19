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
import OSMOTIC_POOL_ABI from "@/constants/abis/Pool.json";
import MERKLE_PROOF from "@/constants/merkle/MerkleProof.json";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import EChartsReact from "echarts-for-react";
import TransactionModal from "../TransactionModal";

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

const OSMOTIC_CONTROLLER_ADDRESS = "0x0b9f52138050881C4d061e6A92f72d8851B59F8e"; //proxy

const ManagerClient = ({ pools }: { pools: any }) => {
  const [openManager, setOpenManager] = useState(false);
  const [currentPool, setCurrentPool] = useState<string>("");
  const [poolStats, setPoolStats] = useState<any>([]);
  const [govTokenAddress, setGovTokenAddress] = useState("");
  //const [currentRound, setCurrentRound] = useState(0);

  const [currentStakedValue, setCurrentStakedValue] = useState(0);

  // current connected address
  const { address: participant } = useAccount();

  //
  const { data: currentRound } = useContractRead({
    //TODO: change it to dynamic, based on current pool
    address: "0xDC66c3c481540dC737212A582880EC2D441BDc54",
    abi: OSMOTIC_POOL_ABI,
    functionName: "getCurrentRound",
  });

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
            data: currentPool == "" ? "" : Number(currentRound),
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
              className="absolute -top-8 right-5 z-50 rounded-full px-2 py-2 text-xs text-textSecondary hover:opacity-80 "
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
                  className="cols-span-1 flex h-full flex-col items-center justify-between rounded-lg py-2"
                >
                  {/* claim voting power */}
                  <Claimbutton
                    govTokenAddress={govTokenAddress}
                    currentPool={currentPool}
                    participant={participant}
                  />

                  {/* pool selection + chart  */}
                  <SelectedPoolAndChart
                    pools={pools}
                    round={currentRound}
                    setCurrentPool={setCurrentPool}
                    currentPool={currentPool}
                    currentStakedValue={currentStakedValue}
                  />

                  <div className="text-textSecoondary flex w-full flex-col">
                    {/* TODO: add href to docs ??? */}
                    {/* <a href="#" target="_blank">
                      <button className="w-full py-2  text-center text-sm text-textSecondary  hover:bg-surface">
                        Documentation
                      </button>
                    </a> */}
                    <span className="flex justify-center py-2 text-center text-xs text-primary">
                      osmoticFund - Demo v.1
                    </span>
                  </div>
                </motion.aside>

                {/* Main section: vote inputs + and chart + checkout */}
                <div className="items-start-2 col-start-2 col-end-5 h-full w-full">
                  <main className="h-full w-full flex-1 p-2">
                    <SupporProjects
                      pool={currentPool}
                      setCurrentStakedValue={setCurrentStakedValue}
                      currentStakedValue={currentStakedValue}
                    />
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
  currentStakedValue: number;
};

const SelectedPoolAndChart = ({
  pools,
  setCurrentPool,
  currentPool,
  currentStakedValue,
}: SelectedPoolAndChartProps) => {
  const [available, setAvailable] = useState(0);

  //calculate available points based on current staked value
  useEffect(() => {
    const totalPoints = 500;
    setAvailable(totalPoints - currentStakedValue);
  }, [currentStakedValue]);

  //chart config
  const option = {
    titile: {
      text: "Points distribution",
      color: "#ccc",
      top: 20,
      left: "center",
      textStyle: {
        color: "#ccc",
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      lineStyle: {
        color: "#fff",
      },
    },

    series: [
      {
        name: "Points distribution",
        type: "pie",
        radius: ["40%", "75%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        textStyle: {
          color: "#000",
        },
        animationType: "scale",
        animationEasing: "elasticOut",

        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            distance: 5,
            color: "#fff",
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(250, 250, 250, 0.9)",
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: currentStakedValue, name: "Staked points" },
          { value: available, name: "Available points" },
        ],
      },
    ],
  };

  return (
    <>
      <div className="">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="hover: flex items-center space-x-4  py-2 hover:opacity-80">
                <span
                  className={`text-sm text-textSecondary ${
                    currentPool === ""
                      ? "animate-pulse text-xl text-red-300"
                      : "text-md"
                  }`}
                >
                  {currentPool === "" ? "Select a pool" : "Select another pool"}
                </span>
                <ChevronUpIcon
                  className={`${
                    open
                      ? "rotate-180 transform transition-all duration-200 ease-in-out"
                      : ""
                  } h-5 w-5 text-primary`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className=" text-gray-500">
                {({ close }) => (
                  <div className="flex w-full flex-col">
                    {pools.length > 0 &&
                      pools?.map((pool: any, idx: number) => (
                        <>
                          <button
                            className="text-md truncate py-2 text-center text-textSecondary hover:bg-surface hover:text-white"
                            key={idx}
                            onClick={async () => {
                              setCurrentPool(pool.address);
                              close();
                            }}
                          >
                            {formatAddress(pool.address)}
                          </button>
                        </>
                      ))}
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      {currentPool === "" ? (
        <>
          {" "}
          {/* <div className="animate-pulse text-center text-textSecondary">
            Select a pool to manage!
          </div> */}
        </>
      ) : (
        <>
          {" "}
          <div className="w-full">
            <EChartsReact
              // handles everything for the chart
              option={option}
              // add className to chart container, is it neccesary ??
              className=""
              // controls width and height of chart
              style={{ height: "400px", width: "100%" }}
              // echarts renderer, default is canvas ??
              opts={{ renderer: "svg" }}
              // callback
              //onChartReady={() => console.log("Chart is ready")}
            />
          </div>
          {/* <Chart maxValue={500} currentValue={currentStakedValue} /> */}
          <div className="text-md -mt-20 truncate text-center">
            Pool: {formatAddress(currentPool)}
          </div>{" "}
        </>
      )}
    </>
  );
};

//CLAIM BUTTON COMPONENT
type ClaimbuttonProps = {
  govTokenAddress: string;
  currentPool: string;
  participant: `0x${string}` | undefined;
};

type ClaimConfig = {
  index: number;
  amount: number;
  proofs: string[];
};

const Claimbutton = ({
  govTokenAddress,
  currentPool,
  participant,
}: ClaimbuttonProps) => {
  const [isClaimed, setIsClaimed] = useState<boolean | undefined>();
  const [claimConfig, setClaimConfig] = useState<ClaimConfig>();

  // funcion to  retrive data from merkle proof
  const getAddressData = (address: any) => {
    const addressData = MERKLE_PROOF[
      address as keyof typeof MERKLE_PROOF
    ] as ClaimConfig;
    if (addressData) {
      const { index, amount, proofs } = addressData;

      setClaimConfig({ index, amount, proofs });

      return { index, amount, proofs };
    } else {
      console.error(`Address ${address} not found in the JSON data.`);
      return null;
    }
  };

  useEffect(() => {
    getAddressData(participant);
    console.log(claimConfig);
  }, [participant]);

  //isClaimed:
  const { data: claim } = usePrepareContractWrite({
    address: "0xf882d8bB3B2F074C870a5C55222a927664e01844",
    abi: MIME_TOKEN_ABI,
    functionName: "isClaimed",
    args: [claimConfig?.index],
    onSuccess: (claim) => {
      setIsClaimed(claim?.result as boolean);
    },
  });

  //balanceOf:
  const { data: balance } = usePrepareContractWrite({
    address: "0xf882d8bB3B2F074C870a5C55222a927664e01844",
    abi: MIME_TOKEN_ABI,
    functionName: "balanceOf",
    args: [participant],

    onSuccess: (balance) => {
      console.log(balance?.result);
    },
  });

  //claim:
  const { config } = usePrepareContractWrite({
    address: "0xf882d8bB3B2F074C870a5C55222a927664e01844",
    abi: MIME_TOKEN_ABI,
    functionName: "claim",
    args: [
      claimConfig?.index,
      participant,
      claimConfig?.amount,
      claimConfig?.proofs,
    ],
    onSuccess: (data) => {
      console.log(data?.mode);
    },
    onError: (error) => {
      console.log("error-claim", error);
    },
  });

  const { write, data, isLoading, isSuccess, error, isError } =
    useContractWrite(config);

  const { isLoading: isWaitLoading, isSuccess: isWaitSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });
  //
  //
  //
  //

  return (
    <>
      <div className="flex w-full justify-center">
        {currentPool === "" ? null : (
          <>
            {isClaimed ? (
              <span className="max-w-[200px] text-textSecondary">
                {/* //TODO: add current round  */}
                Points claimed{" "}
                <span className="ml-2 text-xl font-thin text-primary">
                  {Number(balance?.result)}
                </span>
              </span>
            ) : (
              <div className="relative rounded-full  px-4 py-2 hover:border-primary">
                <TransactionModal
                  label="Claim Voting Power"
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  isError={isError}
                  error={error}
                  isWaitLoading={isWaitLoading}
                  isWaitSuccess={isWaitSuccess}
                  action="Claim voting power"
                  writeFunction={write}
                  hash={data?.hash}
                />

                <span className="absolute right-5 top-1 flex h-3 w-3 ">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
