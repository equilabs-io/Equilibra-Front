import { Fragment, useState } from "react";
import { Dialog, Listbox, Menu, Transition } from "@headlessui/react";

import {
  BellIcon,
  XMarkIcon as XMarkIconOutline,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import PoolCard from "./PoolCard";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Invoices", href: "#" },
  { name: "Clients", href: "#" },
  { name: "Expenses", href: "#" },
];
const invoice = {
  items: [
    {
      id: 1,
      title: "EquiLife",
      description: "New logo and digital asset playbook.",
      status: "Active",
      rate: "$300",
      price: "$2,000.00",
    },
    {
      id: 2,
      title: "EquiDomain",
      description: "Design and program new company website.",
      status: "Active",
      rate: "$600",
      price: "$3,200.00",
    },
    {
      id: 3,
      title: "Business",
      description: 'Design and production of 3.5" x 2.0" business cards.',
      status: "Active",
      rate: "$800",
      price: "$1,200.00",
    },
    {
      id: 4,
      title: "Equi Alpha",
      description: "Three t-shirt design concepts.",
      status: "Inactive",
      rate: "1000",
      price: "$400.00",
    },
  ],
};
const activity = [
  {
    id: 1,
    type: "added to list DAOs",
    person: { name: "Project Name" },
    date: "7d ago",
    dateTime: "2023-01-23T10:32",
  },
  {
    id: 2,
    type: "added to list NFTs",
    person: { name: "Project Name" },
    date: "6d ago",
    dateTime: "2023-01-23T11:03",
  },
  {
    id: 3,
    type: "has been activated",
    person: { name: "Project Name" },
    date: "6d ago",
    dateTime: "2023-01-23T11:24",
  },
  {
    id: 4,
    type: "has been desactivated",
    person: {
      name: "Project Name",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869p03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMp9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    comment: "",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 5,
    type: "added to list",
    person: { name: "Project Name" },
    date: "2d ago",
    dateTime: "2023-01-24T09:12",
  },
  {
    id: 6,
    type: "has been activated",
    person: { name: "Project Name" },
    date: "1d ago",
    dateTime: "2023-01-24T09:20",
  },
];

interface Pool {
  name: string;
  description: string;
  token: string;
  govToken: string;
  elegibleProjects: string[];
  supporting: number;
  available: number;
  streaming: number;
  streamed: number;
  streams: {
    [key: string]: {
      streamed: number;
      streaming: number;
    };
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const PoolsLayout = ({ pools }: { pools: Pool[] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [history, setHistory] = useState(false);
  return (
    <>
      <PoolCard
        name="ChainLink"
        fundingToken="CHP"
        governanceToken="ETHx"
        owner="0x5BE8Bb ..Aa85Ad0Fa4dE3"
      />
      {/* //TODO: chekc mobile version */}
      {/* <main className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <Dialog
          as="div"
          className="lg:hipen"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIconOutline className="h-6 w-6" aria-hipen="true" />
              </button>
              <div className="-ml-0.5">
                <a href="#" className="-m-1.5 block p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading- hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Dialog.Panel>
        </Dialog>
      </main> */}

      <main>
        {/* <header className="relative isolate pt-16 border-2 h-44 border-red-400"></header> */}

        {pools.map((pool, idx) => (
          <div key={idx}>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {/* Left column item 1 Pool Card*/}
                <div className="lg:col-start-1 lg:row-end-1 cursor-pointer">
                  <h2 className="sr-only">Pool stats</h2>
                  <div className="rounded-lg bg-surface shadow-sm">
                    <dl className="flex flex-wrap">
                      <div className="flex-auto pl-6 pt-6">
                        <p className="text-sm lg:text-4xl font-semibold leading-6">
                          {pool.name}
                        </p>
                        <p className="mt-1 text-2xl font-semibold leading-6">
                          $ {pool.available}
                        </p>
                      </div>
                      <div className="flex-none self-end pr-6">
                        <div className="flex flex-col items-center space-y-4">
                          <p className="sr-only">Funding Token</p>
                          <p className="rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-red-600 ring-1 ring-inset ring-green-600/20">
                            {pool.govToken}
                          </p>
                          <p className="rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-blue-600 ring-1 ring-inset ring-green-600/20">
                            {pool.token}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center w-full flex-none gap-x-4 border-t border-m_gray px-6 pt-6 bo">
                        <div className="flex-none">
                          <span className="sr-only">Client</span>
                          <p className="text-xl font-medium leading-">
                            Founded:
                          </p>
                        </div>
                        <p className="text-sm font-medium leading-">
                          $ {pool.streamed}
                        </p>
                      </div>
                      <div className="mt-4 flex w-full flex-none items-center gap-x-4 px-6">
                        <div className="flex-none">
                          <span className="sr-only">Due date</span>
                          <p className="text-xl font-medium leading-">
                            M / streaming:
                          </p>
                        </div>
                        <div className="text-sm leading-6">
                          <p className="text-sm font-medium leading-">
                            $ {pool.streaming}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center w-full flex-none gap-x-4 px-6">
                        <div className="flex-none">
                          <span className="sr-only">
                            how many projects support
                          </span>
                          <p className="text-xl font-medium leading-">
                            Supporting:
                          </p>
                        </div>
                        <p className="text-sm leading-6">
                          {pool.elegibleProjects?.length}
                        </p>
                      </div>
                    </dl>
                    <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                      {/* Description  */}
                      <p className="font-thin text-base">{pool.description}</p>
                    </div>
                  </div>
                </div>

                {/* Left column item 2 Social items*/}
                <div
                  className="flex justify-between p-2 rounded-md hover:bg-slate-800 cursor pointer"
                  onClick={() => setHistory(!history)}
                >
                  <h2 className=" text-sm font-semibold leading-6">
                    Activity feed
                  </h2>
                  {history ? (
                    <ArrowDownIcon className="h-6 w-6" />
                  ) : (
                    <ArrowUpIcon className="h-6 w-6" />
                  )}
                </div>
                {history && (
                  <div className="lg:col-start-1">
                    <ul role="list" className="mt-6 space-y-6">
                      {activity.map((activityItem, activityItemIdx) => (
                        <li
                          key={activityItem.id}
                          className="relative flex gap-x-4"
                        >
                          <div
                            className={classNames(
                              activityItemIdx === activity.length - 1
                                ? "h-6"
                                : "-bottom-6",
                              "absolute left-0 top-0 flex w-6 justify-center"
                            )}
                          >
                            <div className="w-px bg-grey_mlight" />
                          </div>
                          {activityItem.type === "" ? (
                            <></>
                          ) : (
                            <>
                              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-surface border-2 border-grey_mdark rounded-full">
                                {activityItem.type === "paid" ? (
                                  <CheckCircleIcon
                                    className="h-6 w-6 text-primary"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <div className="h-1.5 w-1.5 rounded-full" />
                                )}
                              </div>
                              <p className="flex-auto py-0.5 text-xs leading-5">
                                <span className="font-mediu">
                                  {activityItem.person.name}
                                </span>{" "}
                                {activityItem.type}
                              </p>
                              {/* Days */}
                              <time
                                dateTime={activityItem.dateTime}
                                className="flex-none py-0.5 text-xs leading-5"
                              >
                                {activityItem.date}
                              </time>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Right Column  Projects from pool view*/}
                <div className="px-4 py-8 border-2 border-grey_mdark sm:mx-0 sm:rounded-lg sm:px-8 lg:col-span-2 lg:row-span-2 lg:row-end-2 shadow-primary cursor-pointer">
                  <table className="w-full whitespace-nowrap text-left text-sm leading-6">
                    <colgroup>
                      <col className="w-full" />
                      <col />
                      <col />
                      <col />
                    </colgroup>
                    <thead className="border-b border-grey_dark">
                      <tr>
                        <th scope="col" className="px-0 py-3 font-semibold">
                          Projects
                        </th>
                        <th
                          scope="col"
                          className="hipen py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="hipen py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                        >
                          M/ stream
                        </th>
                        <th
                          scope="col"
                          className="py-3 pl-8 pr-0 text-right font-semibold"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item) => (
                        <tr key={item.id} className="border-b border-surface">
                          <td className="max-w-0 px-0 py-5 align-top">
                            <div className="truncate font-mediu flex items-center gap-3">
                              <h4>{item.title}</h4>
                            </div>
                          </td>
                          <td className="hipen py-5 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell">
                            {item.status}
                          </td>
                          <td className="hipen py-5 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell">
                            {item.rate}
                          </td>
                          <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums">
                            {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};
