"use client";
import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { SupporProjects } from "@/components/SupporProjects";
import { getUrqlClient } from "@/services/urqlService";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

type IndexFunc = (str: string, char: string) => number;
//helper function to get the last 4 chars of a string
function getFourChars(str: string, indexFunc: IndexFunc): string {
  const lastDashIndex = indexFunc(str, "-");
  const fourChars = str.substring(lastDashIndex - 4, lastDashIndex);
  return fourChars;
}
//helper function to get the string before the first dash
function getBeforeFirstDash(str: string): string {
  const firstDashIndex = str.indexOf("-");
  if (firstDashIndex === -1) {
    return str;
  }
  return str.substring(0, firstDashIndex);
}

export default function ProfileDashboard({}) {
  const { address: participant } = useAccount();
  const [participantSupports, setParticipantSupports] = useState([]);
  const [queryPoolbyOwner, setQueryPoolbyOwner] = useState([]);

  useEffect(() => {
    const queryPoolbyOwner = `
    query ($owner: String!) {
        osmoticPools(
            first: 100
            where: {owner: $owner}
          ) {
            address
            mimeToken {
              name
              symbol
            }
            poolProjects(first: 10) {
                id
                poolProjectSupports {
                  support
                  poolProjectParticipantsSupports {
                    support
                    participant
                  }
                }
                currentRound
                active
                flowLastRate
              }
          }
    }
    
    `;
    const participantSupportQuery = `
        query ($participant: String!) {
          poolProjectParticipantSupports(first: 100, where: {participant: $participant}) {
            id    
            support
          }
        }
      `;

    const fetchParticipantSupports = async () => {
      //Get the participant supports
      const result = await getUrqlClient().query(participantSupportQuery, {
        participant,
      });
      setParticipantSupports(result.data.poolProjectParticipantSupports);
    };
    // get the pool by owner
    const fetchPoolbyOwner = async () => {
      const result = await getUrqlClient().query(queryPoolbyOwner, {
        owner: participant,
      });
      setQueryPoolbyOwner(result.data.osmoticPools);
    };

    fetchParticipantSupports();
    fetchPoolbyOwner();
  }, [participant]);

  //TODO: logic if it is a server component
  // const address = "0x5be8bb8d7923879c3ddc9c551c5aa85ad0fa4de3";
  // const participantQueryResult = await getUrqlClient().query(
  //   participantSupportQuery,
  //   { participant: address }
  // );
  // //participant support to projects data []
  // const participantSupports =
  //   participantQueryResult.data.poolProjectParticipantSupports;
  return (
    <>
      <div className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <ProfileHeader />

        {/* Stats */}
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Last 30 days
          </h3>
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-lg bg-surface px-4 py-5 shadow sm:p-6"
              >
                <dt className="truncate text-sm font-medium text-surface_var">
                  {item.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-primary">
                  {item.stat}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {/* <Checkout /> */}

        {queryPoolbyOwner.length > 0 &&
          queryPoolbyOwner.slice(-2)?.map((pool, idx) => (
            <>
              <div key={idx}>
                <Disclousure as={"div"} pool={pool} />
              </div>
            </>
          ))}
      </div>
    </>
  );
}
const stats = [
  { name: "Total Support Given", stat: "450" },
  { name: "Pool Owner", stat: "2" },
  { name: "Staking Projects", stat: "4" },
];

type WrapperProps = {
  label?: string;
  children?: React.ReactNode;
};

const Disclousure = ({ ...props }: any) => {
  const { pool } = props;
  console.log("pool", pool);
  return (
    <div className="w-full">
      <div className="mx-auto w-full rounded-2xl bg-surface p-2">
        <Disclosure defaultOpen={pool[0]} as="div">
          {({ open }) => (
            <>
              <Disclosure.Button
                as="button"
                className="flex w-full justify-between rounded-lg bg-surface px-4 py-2 text-left text-sm font-medium  hover:opacity-80 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
              >
                <span className="text-textSecondary">
                  Pool Address: {pool.address}
                </span>
                <ChevronUpIcon
                  className={`transition-all duration-200 ease-in ${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-primary`}
                />
              </Disclosure.Button>
              <Transition
                appear={true}
                show={open}
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-200 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel
                  as="div"
                  className="px-4 pb-2 pt-4 text-sm text-gray-500"
                >
                  <SupporProjects pool={pool.address} />
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

const CountdownTimer = () => {
  // Set the end date and time for the countdown
  const countdownDate = new Date("December 10, 2023").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = countdownDate - now;

    if (difference <= 0) {
      // Timer has expired
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-800 mb-2">
          Countdown Timer
        </div>
        <div className="text-2xl text-gray-600">
          {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes{" "}
          {timeLeft.seconds} Seconds
        </div>
      </div>
    </div>
  );
};

//TODO!: Delete this components afterwards
const MyModal = ({ ...props }: any) => {
  let [isOpen, setIsOpen] = useState(false);
  const [word, setWord] = useState("hello");
  const { pool } = props;

  function closeModal() {
    setIsOpen(false);
    setWord("goodbye");
  }

  function openModal() {
    setIsOpen(true);
    setWord("helloToYou");
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-surface px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        {pool?.address}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[60vw] transform overflow-hidden rounded-2xl bg-surface p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-surface_var"
                  >
                    {""}
                  </Dialog.Title>
                  <div className="mt-2">
                    <SupporProjects pool={pool.address} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const Wrapper = ({ label = "Projects", children }: WrapperProps) => {
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <h2 className="text-primary ">{label}</h2>
        <div className="border-[1px] border-surface w-full min-h-content rounded-bl-3xl flex flex-col p-4 shadow-lg shadow-surface">
          {children}
        </div>
      </div>
    </>
  );
};
