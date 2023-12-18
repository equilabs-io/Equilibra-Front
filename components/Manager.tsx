"use client";
import React, { Suspense } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Chart } from "./Chart";
import { formatAddress } from "@/lib/format";
import { SupporProjects } from "./SupporProjects";
import { useState } from "react";

export const Manager = ({ ...props }) => {
  const { pools } = props;
  const [currentPool, setCurrentPool] = useState(pools[0].address);

  return (
    <>
      <div className="mt-20 flex w-full flex-col gap-4 px-4 ">
        <header className="">
          <ManagerStats />
        </header>

        <div className="grid h-full grid-cols-4 gap-4">
          {/* Left column area */}
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
          {/* Main area */}
          <div className="items-start-2 col-start-2 col-end-5 h-full w-full ">
            <main className=" h-full w-full flex-1 p-2">
              <Suspense
              // fallback={
              //   <div className="flex h-full items-center justify-center">
              //     <div className="h-32 w-32 animate-spin rounded-full-b-2-gray-900"></div>
              //   </div>
              // }
              >
                <SupporProjects pool={currentPool} />
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
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
const stats = [
  { name: "Pool", value: "0x56d ... 4Dd8" },
  { name: "Gov Token", value: "Fede Token", unit: "" },
  { name: "Management list", value: "Peepo" },
  { name: "Round ", value: "1" },
];

const people = [
  {
    name: "Project ...",
    email: "leslie.alexander@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Project ...",
    email: "michael.foster@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Project ...",
    email: "dries.vincent@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: null,
  },
  {
    name: "Project ...",
    email: "lindsay.walton@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
];
