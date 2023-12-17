import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

export const Manager = () => {
  return (
    <>
      <ManagerDasboard />
    </>
  );
};

function ManagerDasboard() {
  return (
    <div className="z-20 mt-20 flex max-h-full w-full flex-col">
      <header className="shrink-0">
        <ManagerStats />
      </header>

      <div className="mx-auto flex h-full w-full items-center gap-x-8  px-4 py-1 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden h-96 w-44 shrink-0 border lg:block">
          {/* Left column area */}
        </aside>

        <main className="h-full w-full flex-1  border p-2">
          {/* Main area */}
          <ProjectsSupport />
        </main>

        <aside className="sticky top-8 hidden h-full w-96 shrink-0 border p-2 lg:block">
          {/* Right column area */}
        </aside>
      </div>
    </div>
  );
}

function ManagerStats() {
  return (
    <div className="bg-background px-4">
      <div className="mx-auto w-full ">
        <div className="bg-white/5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-surface px-1 py-2 sm:px-6 lg:px-8"
            >
              <p className="text-sm font-medium leading-6 text-textSecondary">
                {stat.name}
              </p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-3xl font-semibold tracking-tight text-white">
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
  { name: "Owenership", value: "Owner", unit: "" },
  { name: "Supporting Projects", value: "4" },
  { name: "Round ", value: "1" },
];

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",

    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: null,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProjectsSupport() {
  return (
    <ul role="list" className="space-y-2 divide-y divide-highlight bg-surface">
      {people.map((person) => (
        <li
          key={person.email}
          className="flex justify-between gap-x-6 rounded-xl border-2 py-5"
        >
          <div className="flex min-w-0 max-w-[150px] items-center gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.imageUrl}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-textSecondary">
                <a href={person.href} className="hover:underline">
                  {person.name}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6 ">
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
