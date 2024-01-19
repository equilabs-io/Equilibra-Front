"use client";

import React, { Fragment, useCallback, useEffect, useState } from "react";
import POOL_ABI from "@/constants/abis/Pool.json";
import { getUrqlClient } from "@/services/urqlService";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import TransactionModal from "./TransactionModal";
import { ProjectIdBadge } from "./Project/ProjectIdBadge";

import { Chart } from "./Chart";
import Link from "next/link";

const osmoticPool = `query (id: "0xdc66c3c481540dc737212a582880ec2d441bdc54") {
    id
    poolProjects(first: 10) {
      id
      poolProjectSupports {
        support
        poolProjectParticipantsSupports {
          support
          participant
        }
      }
    }
  }`;

const queryBySupportAndListed = `query  ($pool: String!, $participant: String!) {
    osmoticPool(id: $pool) {
      poolProjects(first: 25) {
        id
        poolProjectSupports(first: 20) {
          support
          poolProjectParticipantsSupports(
            where: {participant: $participant}
          ) {
            support
            participant
          }
        }
        id
      }
      projectList {
        projects(first: 25) {
          id
        }
      }
    }
  
}`;

const queryByPoolAndParticipant = `query ($pool: String!, $participant: String!) {
    osmoticPool(id: $pool) {
        address
        projectList {
          name
        }
        mimeToken {
          name
          symbol
        }
        poolProjects(first: 25) {
          id
          poolProjectSupports {
            support
            poolProjectParticipantsSupports(
              where: {participant: $participant}
            ) {
              participant
              support
            }
          }
        }
      }
}`;

function extractSubstring(inputString: string) {
  // Split the string by hyphen ('-')
  let parts = inputString.split("-");

  // Check if there are at least two hyphens in the string
  if (parts.length >= 3) {
    // Extract the substring between the hyphens (index 1)
    let result = parts[1];

    // Trim any leading or trailing whitespace
    result = result.trim();

    return result;
  } else {
    // If there are not enough hyphens, return an appropriate message or handle the error as needed
    return "Invalid input: Not enough hyphens";
  }
}

export const SupporProjects = ({
  pool,
  currentStakedValue,
  setCurrentStakedValue,
}: any) => {
  const { address: participant } = useAccount();

  //TODO! Info to show in the dashboard:
  //Pool: ListName - projects - support - total support - percentage of support - currentRound and time to end
  //MimeToken: name, symbol, balance, total supply
  //Participant: address, Mimetoken balance, Staked balance, percentage of support
  //Checkout - difference between new support and previous support

  const [open, setOpen] = useState(false);
  const [poolInfo, setPoolInfo] = useState<any>([{}]);
  const [participantSupports, setParticipantSupports] = useState<any>([{}]);
  const [maxValue, setMaxValue] = useState(350);
  const [newData, setNewData] = useState<any>([]);
  const [projectSelected, setProjectSelected] = useState<any>([]);

  function getFourChars(str: string, indexFunc: any): string {
    if (!str) return "";
    const lastDashIndex = indexFunc(str, "-");
    const fourChars = str.substring(lastDashIndex - 3, lastDashIndex);
    const id = fourChars.substring(0, 1);
    return id;
  }
  //return the last element of a string, use it to get the id
  function getIdOfProyectId(str: string): string {
    return str?.[str.length - 1];
  }

  //new logic which includes all projects in list and supported by participant
  useEffect(() => {
    const fetchSupportedProjectInList = async () => {
      try {
        const result = await getUrqlClient().query(queryBySupportAndListed, {
          pool,
          participant,
        });

        const participantSupports = (
          result.data?.osmoticPool?.poolProjects || []
        ).map((project: any) => {
          const supportInfo = project.poolProjectSupports?.[0] || 0;
          const participantSupportInfo =
            supportInfo.poolProjectParticipantsSupports?.[0] || 0;

          return {
            idOriginal: project.id,
            id: getIdOfProyectId(project.id),
            value: supportInfo.support || 0,
            static: supportInfo.support || 0,
            participantSupport: participantSupportInfo.support || 0,
          };
        });

        const projectsInList = (
          result.data?.osmoticPool?.projectList?.projects || []
        ).map((project: any) => {
          return {
            id: extractSubstring(project.id),
            idOriginal: project.id,
            value: 0,
            static: 0,
            participantSupport: 0,
          };
        });

        // Merge participantSupports and projectsInList based on the 'id' property
        const mergedData = projectsInList
          .map((project: any) => ({
            ...project,
            ...participantSupports.find(
              (participantSupport: any) => participantSupport.id === project.id,
            ),
          }))
          .sort((a: { id: string }, b: { id: string }) => {
            const idA = parseInt(a.id, 10);
            const idB = parseInt(b.id, 10);
            return idA - idB;
          });

        setParticipantSupports(mergedData);
      } catch (error) {
        // Handle error
        console.error(
          "Error fetching data from `fetchSupportedProjectInList`",
          error,
        );
      }
    };

    fetchSupportedProjectInList();
  }, [pool, participant]);

  useEffect(() => {
    const participantSupportQuery = `
        query ($participant: String!) {
          poolProjectParticipantSupports(first: 100, where: {participant: $participant}) {
            id    
            support
          }
        }
      `;
    const fetchParticipantSupports = async () => {
      const result = await getUrqlClient().query(participantSupportQuery, {
        participant,
      });
    };
    const fetchPoolInfoAndParticipantSupports = async () => {
      const result = await getUrqlClient().query(queryByPoolAndParticipant, {
        pool,
        participant,
      });
      // TODO!: not using this info
      setPoolInfo([
        {
          address: result.data?.osmoticPool?.address,
          projectList: result.data?.osmoticPool?.projectList,
          mimeToken: result.data?.osmoticPool?.mimeToken,
        },
      ]);

      // const participantSupports = result.data?.osmoticPool?.poolProjects.map(
      //   (project: {
      //     id: string;
      //     poolProjectSupports: {
      //       support: any;
      //       poolProjectParticipantsSupports: { support: any }[];
      //     }[];
      //   }) => {
      //     return {
      //       idOriginal: project.id,
      //       id: getIdOfProyectId(project.id),
      //       value: project.poolProjectSupports?.[0].support,
      //       static: project.poolProjectSupports?.[0].support,
      //       participantSupport:
      //         project.poolProjectSupports?.[0]
      //           .poolProjectParticipantsSupports?.[0].support,
      //     };
      //   },
      // );
      // setParticipantSupports(participantSupports);
    };

    fetchParticipantSupports();
    fetchPoolInfoAndParticipantSupports();
  }, [pool, participant]);

  let actualCurrentValue = participantSupports?.reduce(
    (acc: string | number, curr: { value: string | number }) =>
      +acc + +curr.value,
    0,
  );

  setCurrentStakedValue(actualCurrentValue ?? actualCurrentValue);

  //function that updates the values of participantSupport throw the range input
  const handleValueChange = (index: number, newValue: number) => {
    // Update the corresponding value in the values array
    setParticipantSupports((prevValues: any) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], value: newValue };
      return updatedValues;
    });
  };

  const resetToInitialState = () => {
    setMaxValue(500);
    // Reset any other state letiables
  };

  const handleResetValues = () => {
    if (isMaxValueReached) {
      resetToInitialState();
    }
  };

  //Function that return array to store the [id, values, newSupport] before submiting transaction
  const generateCheckoutArray = useCallback(() => {
    let checkoutValues: any = [];

    participantSupports?.forEach(
      (value: { value: number; static: number; id: any }) => {
        const difference = value.value - value.static;
        const totalNewSupport = value.value;
        if (difference !== 0) {
          checkoutValues.push([+value.id, difference, totalNewSupport]);
        }
      },
    );
    return checkoutValues;
  }, [participantSupports]);

  const handleCheckout = useCallback(() => {
    setOpen(true);
    generateCheckoutArray(); // Ensure generateCheckoutArray is memoized
  }, [generateCheckoutArray, setOpen]);

  const checkoutValues = generateCheckoutArray();
  const isMaxValueReached = actualCurrentValue === maxValue;

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
    hidden: { opacity: 0.2, scale: 0.8 },
  };
  return (
    <>
      <div className="relative flex h-full items-center gap-2  p-4">
        <ul
          role="list"
          className="flex h-fit w-full max-w-[685px] flex-col justify-start gap-4 space-y-4 overflow-hidden "
        >
          {/* Data and inputs to support and change support for projects */}
          {participantSupports &&
            participantSupports.map(
              (
                project: {
                  idOriginal: any;
                  id:
                    | boolean
                    | React.Key
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined;
                  value:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined;
                },
                index: number,
              ) => (
                <>
                  <motion.li
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    custom={index}
                    key={index}
                    onMouseEnter={() => setProjectSelected(project.id)}
                    className="flex items-center justify-between gap-x-4 rounded-xl  bg-surface px-2 py-4  hover:border"
                  >
                    {/* projectId */}
                    <ProjectIdBadge id={project.id} size="lg" />

                    {/* Range inputs */}
                    <div className="flex flex-1 items-center justify-center bg-surface">
                      <input
                        type="range"
                        id={`range${index + 1}`}
                        disabled={isMaxValueReached}
                        name={`range${index + 1}`}
                        min="0"
                        list="tickmarks"
                        max={maxValue}
                        // @ts-ignore
                        value={project.value}
                        onChange={(e) =>
                          handleValueChange(index, parseInt(e.target.value))
                        }
                        className="h-4 w-[80%] cursor-pointer"
                        step={10}
                      />
                    </div>
                    <div className="">
                      <p className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-2xl font-medium text-white">
                        {project.value} <span className="text-xs">pts</span>
                      </p>
                    </div>
                    <Menu as="div" className="relative flex-none">
                      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-textSecondary">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md  py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                // TODO: adjust id param
                                href={`/demo/projects/${project.idOriginal}`}
                                className="block bg-surface px-3 py-1 text-sm leading-6 text-textSecondary hover:text-primary"
                              >
                                View Project
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </motion.li>
                </>
              ),
            )}
          {/*Reset button for all disabled inputs */}
        </ul>

        {/* maxValue notofication */}
        {/* {isMaxValueReached && (
        <>
          <div className="mt-4 flex items-center justify-center bg-background">
            <span className="rounded-md  p-2">
              You reach the maximum support value of {maxValue}, please checkout
              or reset and try again
            </span>
            <button
              onClick={handleResetValues}
              className="ml-4 rounded-md bg-secondary px-4 py-2 font-semibold text-highlight transition-all duration-200  ease-in-out hover:bg-highlight hover:text-primary "
            >
              Reset All Values
            </button>
          </div>
        </>
      )} */}

        <Checkout
          open={open}
          setOpen={setOpen}
          checkoutValues={checkoutValues}
          balance={350}
          staked={actualCurrentValue}
          poolAddress={pool}
        />
        {/* <button
          onClick={handleCheckout}
          disabled={checkoutValues.length === 0}
          className="absolute bottom-0 left-0 w-full cursor-pointer rounded-md border-2  bg-highlight px-4  py-4 font-semibold  text-textSecondary transition-all duration-200 ease-in-out hover:bg-highlight hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Checkout
        </button> */}

        {/* Right column area */}
        <aside className="grid h-full flex-1 shrink-0 grid-rows-2 gap-4 p-2 shadow">
          <div className="text-center">
            {/* project basico info */}
            <h4>Project: {projectSelected} </h4>
          </div>
          <div className="flex items-end px-6">
            <button
              onClick={handleCheckout}
              disabled={checkoutValues.length === 0}
              className="w-full cursor-pointer rounded-md  bg-surface px-4 py-4 text-textSecondary transition-all duration-200 ease-in-out hover:bg-highlight hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

//CHECKOUT COMPONENT
type CheckoutProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  checkoutValues: [];
  balance: number;
  staked: number;
  poolAddress: `0x${string}`;
};

const Checkout = ({ ...props }: CheckoutProps) => {
  const { checkoutValues, open, setOpen, balance, staked, poolAddress } = props;

  const argValues = checkoutValues.map((value: any) => {
    return [value[0], value[1]];
  });

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: poolAddress,
    abi: POOL_ABI,
    functionName: "supportProjects",
    args: [argValues],
  });

  const { data, isLoading, isSuccess, error, isError, write } =
    useContractWrite(config);

  const { isLoading: isWaitLoading, isSuccess: isWaitSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  const handle = () => {
    setOpen(false);
    write?.();
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300 sm:duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300 sm:duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-surface py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base leading-6">
                          Support Projects Summary
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 text-white sm:px-6">
                        <section
                          aria-labelledby="summary-heading"
                          className="px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
                        >
                          <div className="mx-auto max-w-lg space-y-10 text-textSecondary lg:max-w-none">
                            {checkoutValues.map((value) => (
                              <>
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col">
                                    <ProjectIdBadge id={value[0]} size="lg" />
                                    {/* <span>Current support: 50%</span> */}
                                  </div>
                                  <div className="relative flex flex-col space-y-2">
                                    <span
                                      className={`text-lg ${
                                        value[1] < 0
                                          ? "text-red-400"
                                          : "text-primary"
                                      }`}
                                    >
                                      {value[1] < 0 ? "Remove" : "Added"}
                                      <span className="absolute right-0 top-0 ml-2  text-2xl">
                                        {value[1]}
                                      </span>
                                    </span>
                                    <span className="text-sm font-thin ">
                                      total support: {value[2]}
                                    </span>
                                    <span className="text-sm font-thin ">
                                      Percentage of support:{" "}
                                      {((value[2] / balance) * 100).toFixed(1)}{" "}
                                      %
                                    </span>
                                  </div>
                                </div>
                                <hr className="" />
                              </>
                            ))}
                            <div className="flex h-[150px] flex-col justify-between pl-4">
                              <span>Resume</span>
                              <div className="flex justify-between">
                                <span className="text-lg">Balance</span>
                                <span className="text-2xl ">{balance}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-lg">Staked</span>
                                <span className="text-2xl ">{staked}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-lg">Available</span>
                                <span className="text-2xl">
                                  {balance - staked}
                                </span>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/*Modal*/}
                      <TransactionModal
                        isLoading={isLoading}
                        isWaitLoading={isWaitLoading}
                        isSuccess={isSuccess}
                        isWaitSuccess={isWaitSuccess}
                        label={"Support Projects"}
                        writeFunction={handle}
                        action="Support Projects"
                        hash={data?.hash}
                      />
                      {/*  */}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
