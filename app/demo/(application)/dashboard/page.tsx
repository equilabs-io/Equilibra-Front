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

const participantSupportQuery = `
    query ($participant: String!) {
        poolProjectParticipantSupports(first: 100, where: {participant: $participant}) {
            id    
            support
        }
    }
`;
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
      setParticipantSupports(result.data.poolProjectParticipantSupports);
    };

    fetchParticipantSupports();
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
      <div className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-8 space-y-20">
        <ProfileHeader />
        {/* <Disclousure /> */}
        <MyModal />
        <Wrapper label="Pools"></Wrapper>
      </div>
    </>
  );
}

type WrapperProps = {
  label?: string;
  children?: React.ReactNode;
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

const Disclousure = () => {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>What is your refund policy?</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                If you are unhappy with your purchase for any reason, email us
                within 90 days and we will refund you in full, no questions
                asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

const MyModal = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [word, setWord] = useState("hello");

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
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Modal test
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
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="w-full max-w-[50vw] transform overflow-hidden rounded-2xl bg-surface p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-surface_var"
                  >
                    {""}
                  </Dialog.Title>
                  <div className="mt-2">
                    <SupporProjects pool={word} />
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
