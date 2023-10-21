import { Fragment, useState } from "react";
import { Dialog, Listbox, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import {
  BellIcon,
  XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Invoices", href: "#" },
  { name: "Clients", href: "#" },
  { name: "Expenses", href: "#" },
];
const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [
    {
      id: 1,
      title: "Logo redesign",
      description: "New logo and digital asset playbook.",
      status: "Active",
      rate: "$100.00",
      price: "$2,000.00",
    },
    {
      id: 2,
      title: "Website redesign",
      description: "Design and program new company website.",
      status: "Active",
      rate: "$100.00",
      price: "$5,200.00",
    },
    {
      id: 3,
      title: "Business cards",
      description: 'Design and production of 3.5" x 2.0" business cards.',
      status: "Active",
      rate: "$100.00",
      price: "$1,200.00",
    },
    {
      id: 4,
      title: "T-shirt design",
      description: "Three t-shirt design concepts.",
      status: "Inactive",
      rate: "200",
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
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
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

type PoolsLayoutProps = {
  pools: Pool[];
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const PoolsLayout = ({ pools }: PoolsLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log(pools);

  return (
    <>
      {/* <main className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <Dialog
          as="div"
          className="lg:hidden"
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
                <XMarkIconOutline className="h-6 w-6" aria-hidden="true" />
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

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Left column item 1*/}
            <div className="lg:col-start-1 lg:row-end-1 cursor-pointer">
              <h2 className="sr-only">Pool stats</h2>
              <div className="rounded-lg bg-surface shadow-sm">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm lg:text-4xl font-semibold leading-6">
                      Pool 1
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold leading-6">
                      $ 10,560.00
                    </dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Funding Token</dt>
                    <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-blue-600 ring-1 ring-inset ring-green-600/20">
                      USDC
                    </dd>
                  </div>
                  <div className="mt-6 flex items-center w-full flex-none gap-x-4 border-t border-m_gray px-6 pt-6 bo">
                    <dt className="flex-none">
                      <span className="sr-only">Client</span>
                      <dd className="text-xl font-medium leading-">Founded:</dd>
                    </dt>
                    <dd className="text-sm font-medium leading-">7000</dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none items-center gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Due date</span>
                      <dd className="text-xl font-medium leading-">
                        M / streaming:
                      </dd>
                    </dt>
                    <dd className="text-sm leading-6">
                      <dd className="text-sm font-medium leading-">2000</dd>
                    </dd>
                  </div>
                  <div className="mt-4 flex items-center w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">how many projects support</span>
                      <dd className="text-xl font-medium leading-">
                        Supponting:
                      </dd>
                      {/* <CreditCardIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                    </dt>
                    <dd className="text-sm leading-6">4 projects at a time</dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                  {/* Description  */}
                  <p className="font-thin text-base">
                    Community of builders and contributors who are working to
                    build a more sustainable and equitable future for all.
                  </p>
                </div>
              </div>
            </div>

            {/* Left column item 2 */}
            <div className="lg:col-start-1">
              <h2 className="text-sm font-semibold leading-6">Activity feed</h2>
              <ul role="list" className="mt-6 space-y-6">
                {activity.map((activityItem, activityItemIdx) => (
                  <li key={activityItem.id} className="relative flex gap-x-4">
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
            {/* Right Column */}
            <div className="-mx-4 px-4 py-8 shadow-sm  sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-2 shadow-primary cursor-pointer">
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
                      className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
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
                          <div className="h-11 w-11 flex-shrink-">
                            <img
                              className="h-11 w-11 rounded-full border-2"
                              src={
                                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              }
                              alt=""
                            />
                          </div>

                          <h4>{item.title}</h4>
                        </div>
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell">
                        {item.status}
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell">
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
      </main>
    </>
  );
};

// const people = [
//   {
//     name: "Lindsay Walton",
//     title: "Front-end Developer",
//     department: "Optimization",
//     email: "lindsay.walton@example.com",
//     role: "Member",
//     image:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
// ];

// export function ProjectsTable() {
//   return (
//     <table className="min-w-full divide-y divide-gray-300">
//       <thead>
//         <tr>
//           <th
//             scope="col"
//             className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
//           >
//             Name
//           </th>
//           <th
//             scope="col"
//             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//           >
//             Title
//           </th>
//           <th
//             scope="col"
//             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//           >
//             Status
//           </th>
//           <th
//             scope="col"
//             className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//           >
//             Role
//           </th>
//           <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
//             <span className="sr-only">Edit</span>
//           </th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-200 bg-white">
//         {people.map((person) => (
//           <tr key={person.email}>
//             <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
//               <div className="flex items-center">
//                 <div className="h-11 w-11 flex-shrink-0">
//                   <img
//                     className="h-11 w-11 rounded-full"
//                     src={person.image}
//                     alt=""
//                   />
//                 </div>
//                 <div className="ml-4">
//                   <div className="font-medium text-gray-900">{person.name}</div>
//                   <div className="mt-1 text-gray-500">{person.email}</div>
//                 </div>
//               </div>
//             </td>
//             <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
//               <div className="text-gray-900">{person.title}</div>
//               <div className="mt-1 text-gray-500">{person.department}</div>
//             </td>
//             <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
//               <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
//                 Active
//               </span>
//             </td>
//             <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
//               {person.role}
//             </td>
//             <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
//               <a href="#" className="text-indigo-600 hover:text-indigo-900">
//                 Edit<span className="sr-only">, {person.name}</span>
//               </a>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
