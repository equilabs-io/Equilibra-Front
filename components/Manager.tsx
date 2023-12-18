// "use client";
import React, { Suspense } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { getUrqlClient } from "@/services/urqlService";

import { Chart } from "./Chart";
import { formatAddress } from "@/lib/format";
import { SupporProjects } from "./SupporProjects";
// import { useState } from "react";
const participantSupportQuery = `
query ($participant: String!) {
  poolProjectParticipantSupports(first: 100, where: {participant: $participant}) {
    id    
    support
  }
}
`;
export default async function Manager({
  searchParams,
  params,
}: {
  searchParams: { query?: string };
  params: any;
}) {
  const param = searchParams?.query?.toString() ?? "";

  // const { pools } = props;
  // const [currentPool, setCurrentPool] = useState(pools[0].address);
  // const address = "0x5be8bb8d7923879c3ddc9c551c5aa85ad0fa4de3";
  // const participantQueryResult = await getUrqlClient().query(
  //   participantSupportQuery,
  //   { participant: address },
  // );
  //participant support to projects data []
  // const participantSupports =
  //   participantQueryResult.data.poolProjectParticipantSupports;

  // console.log("participantSupports", participantSupports);
  return (
    <>
      <h1 className="mt-20">testing things..{param}.</h1>

      {/* <div className="mt-20 flex w-full flex-col gap-4 px-4 ">
        <header className="">
          <ManagerStats />
        </header>

        <div className="grid h-full grid-cols-4 gap-4">
          
          <aside className="cols-span-1 h-full rounded-lg">
            {pools.length > 0 &&
              pools.slice(-2)?.map((pool: any, idx: number) => (
                <>
                  <div
                    className="truncate"
                    key={idx}
                    onClick={() => setCurrentPool(pool.address)}
                  >
                    <p className="text-sm text-textSecondary">
                      {formatAddress(pool.address)}
                    </p>
                  </div>
                </>
              ))}
            <div className="mt-20 truncate">
              Current Pool {currentPool ?? currentPool}
            </div>
          </aside>
          
          <div className="items-start-2 col-start-2 col-end-5 h-full w-full ">
            <main className=" h-full w-full flex-1 p-2">
              <Suspense
         
              >
                <SupporProjects pool={currentPool} />
              </Suspense>
            </main>
          </div>
        </div>
      </div> */}
    </>
  );
}
function ProjectsSupport() {
  return (
    <ul
      role="list"
      className="flex h-full flex-col justify-start space-y-4 overflow-hidden"
    >
      {people.map((person) => (
        <li
          key={person.email}
          className="flex justify-between gap-x-6 rounded-xl bg-surface px-2 py-4"
        >
          <div className="flex min-w-0 max-w-[150px] items-center gap-x-2">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.imageUrl}
              alt=""
            />
            <div className="truncate">
              <p className="text-sm text-textSecondary">{person.name}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              {/* <p className="text-sm leading-6 text-textSecondary">
                {person.role}
              </p> */}
              {person.lastSeen ? (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-red-700/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-200" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Inactive</p>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>

            {/* Menu to Link - project view */}
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-textSecondary">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-background py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-surface" : "",
                          "block px-3 py-1 text-sm leading-6 text-textSecondary",
                        )}
                      >
                        View Project
                        <span className="sr-only">, {person.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}
