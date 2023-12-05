'use client';

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as ABI from '@/constants/abis/MimeToken.json';
import POOL_ABI from '@/constants/abis/Pool.json';
import { useDebounce } from '@/hooks/useDebounce';
import { getUrqlClient } from '@/services/urqlService';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';

import { Chart } from './Chart';

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
    address: '0xDC66c3c481540dC737212A582880EC2D441BDc54',
    abi: POOL_ABI,
    functionName: 'supportProjects',
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
  const [maxValue, setMaxValue] = useState(350);

  function getFourChars(str: string, indexFunc: any): string {
    if (!str) return '';
    const lastDashIndex = indexFunc(str, '-');
    const fourChars = str.substring(lastDashIndex - 3, lastDashIndex);
    const id = fourChars.substring(0, 1);
    return id;
  }
  function getIdOfProyectId(str: string): string {
    return str?.[str.length - 1];
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

      const participantSupports = result.data.osmoticPool.poolProjects.map(
        (project) => {
          return {
            id: getIdOfProyectId(project.id),
            value: project.poolProjectSupports?.[0].support,
            static: project.poolProjectSupports?.[0].support,
            participantSupport:
              project.poolProjectSupports?.[0]
                .poolProjectParticipantsSupports?.[0].support,
          };
        },
      );
      setParticipantSupports(participantSupports);
    };

    fetchParticipantSupports();
    fetchPoolInfoAndParticipantSupports();
  }, []);

  let actualCurrentValue = participantSupports.reduce(
    (acc, curr) => +acc + +curr.value,
    0,
  );

  //   const [newValues, setNewValues] = participantSupports.map((project, idx) => {
  //     return {
  //       id: getIdOfProyectId(project.id),
  //       value: project.poolProjectSupports?.[0].support,
  //       static: project.poolProjectSupports?.[0].support,
  //       participantSupport:
  //         project.poolProjectSupports?.[0].poolProjectParticipantsSupports?.[0]
  //           .support,
  //     };
  //   });

  const handleValueChange = (index: number, newValue: number) => {
    // Update the corresponding value in the values array
    setParticipantSupports((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], value: newValue };
      return updatedValues;
    });
  };

  const resetToInitialState = () => {
    setValues([
      { id: 1, value: 80 },
      { id: 2, value: 200 },
    ]);
    setMaxValue(350);
    // Reset any other state variables
  };

  const handleResetValues = () => {
    if (isMaxValueReached) {
      resetToInitialState();
    }
  };

  console.log(participantSupports.map((project) => typeof project));

  //Function that return array to store the values before submiting transaction
  const generateCheckoutArray = useCallback(() => {
    let checkoutValues: any = [];

    participantSupports.forEach((value) => {
      const difference = value.value - value.static;
      const totalNewSupport = value.value;
      if (difference !== 0) {
        checkoutValues.push([value.id, difference, totalNewSupport]);
      }
    });
    return checkoutValues;
  }, [participantSupports]);

  const handleCheckout = useCallback(() => {
    setOpen(true);
    generateCheckoutArray(); // Ensure generateCheckoutArray is memoized
  }, [generateCheckoutArray, setOpen]);

  const checkoutValues = generateCheckoutArray();
  const isMaxValueReached = actualCurrentValue === maxValue;

  //values from data:
  const poolAddress = poolInfo?.[0].address;
  const mimeTokenSymbol = poolInfo?.[0].mimeToken?.symbol;
  const mimeTokenName = poolInfo?.[0].mimeToken?.name;
  const projectList = poolInfo?.[0].projectList?.name;

  return (
    <>
      <div className="grid grid-cols-1 items-center space-x-2  lg:grid-cols-3">
        {/* Pool tokens Info */}

        <div className="col-span-1 text-white">
          <div className="mt-2 flex w-full items-center">
            <div className="flex w-full items-center justify-center space-y-2">
              <TiltCard balance={350} staked={actualCurrentValue}>
                <Chart maxValue={maxValue} currentValue={actualCurrentValue} />
              </TiltCard>
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
          className="col-span-2 flex h-full flex-col space-y-8  py-2 "
        >
          <p className="h-fit text-center">
            Give support with
            <span className="ml-1 rounded-full bg-highlight px-2 py-1 text-primary">
              {mimeTokenName}
            </span>{' '}
            to the projects of your choice
          </p>

          {participantSupports.map((project, index) => (
            <>
              <li
                key={project.id}
                className="shadow-inset max-h-min cursor-pointer rounded-lg bg-surface shadow-background transition-all duration-300 ease-in-out"
              >
                <div className="flex">
                  <div className="flex items-center justify-center rounded-full  p-2">
                    <label htmlFor="medium-range" className="text-md">
                      id: {project.id}
                    </label>
                  </div>

                  <div className="flex flex-1 items-center justify-center bg-surface">
                    <input
                      type="range"
                      id={`range${index + 1}`}
                      disabled={isMaxValueReached}
                      name={`range${index + 1}`}
                      min="0"
                      max={maxValue}
                      value={project.value}
                      onChange={(e) =>
                        handleValueChange(index, parseInt(e.target.value))
                      }
                      className="w-full cursor-pointer appearance-none bg-background [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary_var [&::-webkit-slider-thumb]:hover:bg-primary"
                      step={10}
                    />
                  </div>
                  <div className="">
                    <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 font-mono text-2xl font-medium text-white">
                      <svg
                        className="h-1 w-1 fill-green-400"
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle cx={3} cy={3} r={3} />
                      </svg>
                      {project.value}
                    </span>
                  </div>
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
      )}

      {/* Checkout button */}
      <div className="mt-10">
        <Checkout
          open={open}
          setOpen={setOpen}
          checkoutValues={checkoutValues}
          balance={350}
          staked={actualCurrentValue}
        />
        <button
          onClick={handleCheckout}
          disabled={checkoutValues.length === 0}
          className="w-full cursor-pointer rounded-md bg-highlight px-4  py-4 font-semibold  text-textSecondary transition-all  duration-200 ease-in-out hover:bg-highlight hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
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
  balance: number;
  staked: number;
};

const Checkout = ({ ...props }: CheckoutProps) => {
  const { checkoutValues, open, setOpen, balance, staked } = props;

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
                          Support summary
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
                                <div className="flex items-baseline justify-between ">
                                  <div className="flex flex-col">
                                    <span className="text-xl font-semibold">
                                      Project id: {value[0]}
                                    </span>
                                    {/* <span>Current support: 50%</span> */}
                                  </div>
                                  <div className="relative flex flex-col">
                                    <span
                                      className={`text-lg ${
                                        value[1] < 0
                                          ? 'text-red-400'
                                          : 'text-primary'
                                      }`}
                                    >
                                      {value[1] < 0 ? 'Remove' : 'Added'}
                                      <span className="absolute right-0 top-0 ml-2  text-2xl">
                                        {value[1]}
                                      </span>
                                    </span>
                                    <span className="text-sm font-thin ">
                                      total support: {value[2]}
                                    </span>
                                    <span className="text-sm font-thin ">
                                      Percentage of support:{' '}
                                      {((value[2] / balance) * 100).toFixed(1)}{' '}
                                      %
                                    </span>
                                  </div>
                                </div>
                                <hr className="my-2" />
                              </>
                            ))}
                            <div className="flex h-[150px] flex-col justify-between pl-4">
                              <p>Resume</p>
                              <div className="flex justify-between">
                                <span className="text-xl font-semibold">
                                  Balance
                                </span>
                                <span className="text-xl ">{balance}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xl font-semibold">
                                  Staked
                                </span>
                                <span className="text-xl ">{staked}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xl font-semibold">
                                  Available
                                </span>
                                <span className="text-xl ">
                                  {balance - staked}
                                </span>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <button
                        className="border-2"
                        onClick={() => setOpen(false)}
                      >
                        SEND TRANSACTION
                      </button>
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

const TiltCard = ({ children, balance, staked }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

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
        transformStyle: 'preserve-3d',
      }}
      className="h-96 w-72 rounded-xl  bg-highlight"
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-4 flex flex-col items-center justify-evenly rounded-xl bg-surface  shadow-lg"
      >
        <div className="absolute left-1/2 top-1/2 z-50 flex min-h-[100px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-between text-lg text-textSecondary">
          <span>Balance: {balance}</span>
          <span>Staked: {staked}</span>
        </div>
        {children}
      </div>
    </motion.div>
  );
};
