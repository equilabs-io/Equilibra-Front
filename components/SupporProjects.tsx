"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { useDebounce } from "@/hooks/useDebounce";
import { DonutChart } from "./DonutChart";
import { Dialog, Transition } from "@headlessui/react";
import { getUrqlClient } from "@/services/urqlService";
import * as ABI from "@/constants/abis/MimeToken.json";
import POOL_ABI from "@/constants/abis/Pool.json";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
        poolProjects(first: 10) {
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

export const SupporProjects = ({ pool }: any) => {
  const { address: participant } = useAccount();

  //TODO! Info to show in the dashboard:
  //Pool: ListName - projects - support - total support - percentage of support - currentRound and time to end
  //MimeToken: name, symbol, balance, total supply
  //Participant: address, Mimetoken balance, Staked balance, percentage of support

  //Checkout - difference between new support and previous support

  //Send Transaction:
  //Loading state: ??
  //Success state: ??
  //Error state: ??

  //!contractWrite
  const { data, isLoading, isSuccess, write } = useContractWrite({
    // this address is the pool address
    address: "0xDC66c3c481540dC737212A582880EC2D441BDc54",
    abi: POOL_ABI,
    functionName: "supportProjects",
    // this is the array of arguments for the function
    args: [
      [
        [7, 20],
        [8, 10],
      ],
    ],
    onError(error) {
      console.log(error);
    },
  });
  // const { data }: any = useContractRead({
  //   address: "",
  //   chainId: 5,
  //   abi: ABI,
  //   functionName: "name",
  // });

  //checkout slideOver state
  const [open, setOpen] = useState(false);

  const [poolInfo, setPoolInfo] = useState<any>([{}]);
  const [participantSupports, setParticipantSupports] = useState<any>([{}]);
  const [values, setValues] = useState([
    { id: 1, value: 0, static: 0 },
    { id: 2, value: 0, static: 0 },
  ]);
  const [maxValue, setMaxValue] = useState(350);

  const previousValuesRef = useRef<
    { id: number; value: number; static: number }[]
  >([]);

  function getFourChars(str: string, indexFunc: any): string {
    if (!str) return "";
    const lastDashIndex = indexFunc(str, "-");
    const fourChars = str.substring(lastDashIndex - 3, lastDashIndex);
    const id = fourChars.substring(0, 1);
    return id;
  }

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

      setValues([
        {
          id: 7,
          value: +result.data.poolProjectParticipantSupports[4].support,
          static: +result.data.poolProjectParticipantSupports[4].support,
        },
        {
          id: 8,
          value: +result.data.poolProjectParticipantSupports[5].support,
          static: +result.data.poolProjectParticipantSupports[5].support,
        },
      ]);
    };
    const fetchPoolInfoAndParticipantSupports = async () => {
      const result = await getUrqlClient().query(queryByPoolAndParticipant, {
        pool,
        participant,
      });
      setPoolInfo([
        {
          address: result.data.osmoticPool.address,
          projectList: result.data.osmoticPool.projectList,
          mimeToken: result.data.osmoticPool.mimeToken,
        },
      ]);
      setParticipantSupports([result.data.osmoticPool.poolProjects]);
    };

    fetchParticipantSupports();
    fetchPoolInfoAndParticipantSupports();
  }, []);

  let actualCurrentValue = values.reduce((acc, curr) => acc + curr.value, 0);

  const handleValueChange = (index: number, newValue: number) => {
    // Update the corresponding value in the values array
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], value: newValue };
      return updatedValues;
    });

    // Update the actualCurrentValue
    const newCurrentValue = values.reduce((acc, curr) => acc + curr.value, 0);
  };

  const resetToInitialState = () => {
    setValues([
      { id: 1, value: 100 },
      { id: 2, value: 200 },
    ]);
    setMaxValue(350);
    // Reset any other state variables you might have
  };

  const handleResetValues = () => {
    if (isMaxValueReached) {
      resetToInitialState();
    }
  };

  //Function that return array to store the values before submiting transaction
  const generateCheckoutArray = useCallback(() => {
    let checkoutValues: any = [];

    values.forEach((value) => {
      const difference = value.value - value.static;
      if (difference !== 0) {
        checkoutValues.push([value.id, difference]);
      }
    });
    return checkoutValues;
  }, [values]);

  const handleCheckout = useCallback(() => {
    setOpen(true);
    generateCheckoutArray(); // Ensure generateCheckoutArray is memoized
  }, [generateCheckoutArray, setOpen]);

  const checkoutValues = generateCheckoutArray();
  const isMaxValueReached = actualCurrentValue === maxValue;
  const poolAddress = poolInfo?.[0].address;
  const mimeTokenSymbol = poolInfo?.[0].mimeToken?.symbol;
  const projectList = poolInfo?.[0].projectList?.name;

  return (
    <>
      <div className="space-x-2  grid grid-cols-3">
        {/* Pool tokens Info */}
        <div className="text-textSecondary  border-purple-500 col-span-1">
          <div className="mt-2 w-full flex items-center">
            <div className="space-y-2">
              <p className="">Your Balances:</p>
              <span className="mr-2 text-2xl font-mono">{maxValue}</span>
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-surface px-4 py-1  font-medium text-primary">
                {mimeTokenSymbol}
              </span>
              <div>
                <span className="mr-2 text-2xl font-mono">
                  {actualCurrentValue}
                </span>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-surface px-4 py-1  font-medium text-primary">
                  {mimeTokenSymbol} already staked
                </span>
              </div>
              <div className="flex-1 flex justify-end">
                <DonutChart
                  maxValue={maxValue}
                  currentValue={actualCurrentValue}
                />
              </div>
            </div>
          </div>
        </div>
        {/* //! testting sending support throw interface */}
        {/* <div>
          <button onClick={() => write?.()} className=" w-full p-2">
            SEND TRANSACTION
          </button>
          {isLoading && (
            <div className=" absolute top-0 left-0 w-full h-full bg-surface">
              Check Wallet
            </div>
          )}
          {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div> */}

        {/* Ranger inputs */}
        <ul
          role="list"
          className="col-span-2 grid grid-cols-1 gap-6   border-red-400"
        >
          <p className=" text-center">
            Give support{" "}
            {/* <span className="text-primary uppercase">{projectList}</span>  */}
            with your tokens to the projects of your choice
          </p>
          {values.map((value, index) => (
            <>
              <li
                key={value.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-background shadow-md hover:shadow-slate-500 cursor-pointer transition-all duration-300 ease-in-out "
              >
                <div className="px-4 p-1">
                  <label
                    htmlFor="medium-range"
                    className="mb-2 text-md font-mono text-gray-900 dark:text-white flex items-center justify-evenly "
                  >
                    id: {value.id}
                    <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 font-medium text-white ring-1 ring-inset ring-gray-800 font-mono text-2xl">
                      <svg
                        className="h-1.5 w-1.5 fill-green-400"
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle cx={3} cy={3} r={3} />
                      </svg>
                      {value.value}
                    </span>
                  </label>
                  <input
                    type="range"
                    id={`range${index + 1}`}
                    disabled={isMaxValueReached}
                    name={`range${index + 1}`}
                    min="0"
                    max={maxValue}
                    value={value.value}
                    onChange={(e) =>
                      handleValueChange(index, parseInt(e.target.value))
                    }
                    className="appearance-none bg-background w-full cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary_var [&::-webkit-slider-thumb]:hover:bg-primary"
                    step={10}
                  />
                </div>
              </li>
            </>
          ))}
          {/*Reset button for all disabled inputs */}
        </ul>
      </div>
      {/* Alert when reaching maxvalue of Token staked */}
      {isMaxValueReached && (
        <>
          <div className="flex">
            <span className=" p-2 border-red-400 rounded-md">
              You reach the maximum support value of {maxValue}, please checkout
              or reset and try again
            </span>
            <button
              onClick={handleResetValues}
              className="bg-secondary text-white px-4 py-2 rounded-md ml-4 "
            >
              Reset All Values
            </button>
          </div>
        </>
      )}

      {/* Checkout button */}
      <div className="mt-10">
        <Checkout
          open={open}
          setOpen={setOpen}
          checkoutValues={checkoutValues}
        />
        <button
          onClick={handleCheckout}
          className="text-textSecondary px-4 py-4 rounded-md bg-highlight  w-full hover:bg-highlight  hover:text-primary transition-all  duration-200 ease-in-out font-semibold"
        >
          Checkout
        </button>
      </div>
    </>
  );
};
type CheckoutProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  checkoutValues: [];
};

const Checkout = ({ ...props }: CheckoutProps) => {
  const { checkoutValues, open, setOpen } = props;

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
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
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
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
                        <Dialog.Title className="text-base font-thin leading-6">
                          Chechout Panel
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 text-white">
                        {checkoutValues.length <= 0
                          ? "No changes to checkout"
                          : "Lets goo"}
                        {/* Your content */}
                      </div>
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

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Example = () => {
  return (
    <div className="grid w-full place-content-center bg-surface px-4 py-12 text-slate-900">
      <TiltCard />
    </div>
  );
};

const TiltCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["1.5deg", "-1.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-1.5deg", "1.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 rounded-xl bg-highlight"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-surface shadow-lg"
      >
        {/* <FiMousePointer
          style={{
            transform: "translateZ(75px)",
          }}
          className="mx-auto text-4xl"
        /> */}
        <p
          style={{
            transform: "translateZ(50px)",
          }}
          className="text-center text-2xl font-bold"
        >
          HOVER ME
        </p>
      </div>
    </motion.div>
  );
};
