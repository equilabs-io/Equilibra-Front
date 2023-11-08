import { NextPage } from "next";
import { getUrqlClient } from "@/services/urqlService";
import { PoolCardProps } from "@/types";
import { Link } from "@/components/Link";
import Balance from "@/components/Balance";

//TODO: create Querys folder for all queries and move this to it
const poolQuery = `
      query ($id: ID!) {
        osmoticPool(id: $id ) {
          id
          owner
          maxActiveProjects
          address
          mimeToken {   
            name
            symbol
          }
          poolProjects(first: 10) {
            id
            active
            flowLastRate
            flowLastTime
            currentRound
          }
        }
      }
    `;

type PoolIdProps = {
  id: string;
};
//helper function
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default async function PoolId({ params }: { params: PoolIdProps }) {
  // Logic to get pool data
  const poolQueryResult = await getUrqlClient().query(poolQuery, {
    id: params.id,
  });

  //return pool data
  const pool = poolQueryResult.data?.osmoticPool;

  //pool stats, real data except for total streamed
  const poolStats = [
    {
      name: "Treasury",
      value: <Balance address={pool?.address} />,
      unit: "ETHx",
    },
    { name: "Total Streamed", value: "0.0005", unit: "ETHx" },
    { name: "Current Listed Projects", value: pool?.poolProjects.length },
    { name: "Max Active Projects", value: pool?.maxActiveProjects },
  ];
  //status colors for pool projects
  const statuses = {
    Active: "text-green-400 bg-green-400/10",
    Inactive: "text-rose-400 bg-rose-400/10",
  };

  //helper function to get last 4 letters of pool id used for pool "name and project name"
  function getLastFourLetters(poolId: string, places = 4): string {
    return poolId?.slice(-places);
  }
  //pool name
  const poolName = getLastFourLetters(pool?.id);

  //all pool projects {}
  const allPoolsProjects = pool.poolProjects.map(
    (project: {
      id: string;
      active: boolean;
      flowLastRate: number;
      flowLastTime: number;
      currentRound: number;
    }) => {
      return {
        id: getLastFourLetters(project.id, 6),
        active: project.active,
        flowLastRate: project.flowLastRate,
        flowLastTime: project.flowLastTime,
        currentRound: project.currentRound,
      };
    }
  );

  //helper function to format date from flow Last Time
  function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day} / ${month} / ${year}`;
  }
  //
  // const activityItems = [
  //   {
  //     user: {
  //       name: "Project " + projectOneName,
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     },
  //     commit: "2d89f0c8",
  //     branch: "main",
  //     status: "Active",
  //     duration: "25s",
  //     date: "45 minutes ago",
  //     dateTime: "2023-01-23T11:00",
  //   },
  //   {
  //     user: {
  //       name: "Project " + projectTwoName,
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     },
  //     commit: "2d89f0c8",
  //     branch: "main",
  //     status: "Active",
  //     duration: "25s",
  //     date: "45 minutes ago",
  //     dateTime: "2023-01-23T11:00",
  //   },

  //   // More items...
  // ];
  return (
    <>
      <div className="w-full">
        <div className="">
          <main>
            <header>
              {/* Heading */}
              <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:px-8 rounded-xl">
                <div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    <h1 className="flex gap-x-3 text-base leading-7">
                      <span className="font-semibold text-4xl">
                        Pool Name {""}
                        <span className="text-primary ml-2"> #{poolName}</span>
                      </span>

                      <span className="font-semibold text-white"></span>
                    </h1>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-md bg-pink-100/10 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-pink-400/20 ml-2">
                    <Link
                      href={`https://goerli.etherscan.io/address/${pool?.mimeToken.address}`}
                      isExternal
                    >
                      <p className="text-clip overflow-hidden max-w-content text-secondary">
                        {pool?.mimeToken.name}
                      </p>
                    </Link>
                  </span>
                  {/* <span className="inline-flex items-center rounded-md bg-pink-100/10 px-2 py-1 text-xs font-medium text-secondary ring-1 ring-inset ring-pink-400/20 ml-2">
                    {pool?.mimeToken.symbol}
                  </span> */}
                </div>
              </div>
              {/* contract address / owner address */}
              <div className="flex flex-col lg:flex-row my-4 bg-background rounded-xl justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="p-2 rounded-lg hover:bg-surface transition-transform ease-in-out duration-200">
                  <span className="text-slate-400">contract address</span>{" "}
                  <Link
                    href={`https://goerli.etherscan.io/address/${pool?.address}`}
                    isExternal
                  >
                    <p className="text-clip overflow-hidden max-w-content text-secondary font-mono">
                      {pool?.address}
                    </p>
                  </Link>
                </div>
                <div className="p-2 rounded-lg hover:bg-surface transition-transform ease-in-out duration-200">
                  <span className="text-slate-400">owner</span>{" "}
                  <p className="text-clip overflow-hidden max-w-content text-primary font-mono">
                    {pool?.owner}
                  </p>
                </div>
              </div>
              {/* poolStats */}
              <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4 ">
                {poolStats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    className={classNames(
                      statIdx % 2 === 1 ? "sm:" : statIdx === 2 ? "" : "",
                      "rounded-xl py-6 px-4 sm:px-6 lg:px-8 hover:bg-gray-700/20 transition-all ease-in-out duration-150"
                    )}
                  >
                    <p className="text-sm font-medium leading-6 text-gray-400">
                      {stat.name}
                    </p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight text-white">
                        {stat.value}
                      </span>
                      {stat.unit ? (
                        <span className="text-sm text-gray-400">
                          {stat.unit}
                        </span>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            </header>

            {/* project list */}
            <div className="pt-11">
              <div className="flex items-center justify-between">
                <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">
                  Current Pool Projects
                </h2>
                <h3 className="text-base px-4">Round - 0</h3>
              </div>
              <table className="mt-6 w-full whitespace-nowrap text-left">
                <colgroup>
                  <col className="w-full sm:w-4/12" />
                  <col className="lg:w-4/12" />
                  <col className="lg:w-2/12" />
                  <col className="lg:w-1/12" />
                  <col className="lg:w-1/12" />
                </colgroup>
                <thead className="border-b border-slate-800 text-sm leading-6 text-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                    >
                      Project Id
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                    >
                      Flow Last Rate
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                    >
                      Flow Last Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {allPoolsProjects.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                        <div className="flex items-center gap-x-4">
                          {/* <img
                            src={item.user.imageUrl}
                            alt=""
                            className="h-8 w-8 rounded-full bg-gray-800"
                          /> */}
                          <div className="truncate text-sm font-medium leading-6 text-white">
                            Project{" "}
                            <span className="ml-2 text-primary">{item.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                        <div className="flex gap-x-3">
                          <div className="font-mono text-sm leading-6 text-gray-400">
                            0x1234...
                          </div>
                          {/* <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"></span> */}
                        </div>
                      </td>
                      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                          <div
                            className={classNames(
                              statuses[item.active ? "Active" : "Inactive"],
                              "flex-none rounded-full p-1"
                            )}
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                          </div>
                          <div className="hidden text-white sm:block">
                            {item.active ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                        {item.flowLastRate}
                      </td>
                      <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                        <time dateTime={item.flowLastTime}>
                          {formatDate(item.flowLastTime)}
                        </time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
