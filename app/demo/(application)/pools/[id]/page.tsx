"use client";
import { getUrqlClient } from "@/services/urqlService";
import Balance from "@/components/Balance";
import { formatAddress } from "@/lib/format";
import { ProjectIdBadge } from "@/components/Project/ProjectIdBadge";
import { etherUnits, formatEther } from "viem";

const poolQuery = `
      query ($id: String!) {
        osmoticPool(id: $id ) {
          id
          owner
          maxActiveProjects
          address
          mimeToken {   
            name
            symbol
          }
          poolProjects {
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
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ItemType = {
  id: string;
  address: string;
  active: boolean;
  flowLastRate: number;
  flowLastTime: number;
  currentRound: number;
};

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
      name: "Funds",
      value: <Balance address={pool?.address} symbol={false} />,
      symbol: "DAIx",
    },
    { name: "Total Streamed", value: "0", symbol: "DAIx" },
    { name: "Active Projects", value: pool?.poolProjects.length },
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

  const formatFlow = (flow: number | string) => {
    return formatEther(BigInt(flow)).toString().slice(0, -8);
  };

  //all pool projects {}
  const allPoolsProjects = pool.poolProjects.map((project: ItemType) => {
    return {
      id: getLastFourLetters(project.id, 4),

      // TODO! change to real address

      address: project.id,
      active: project.active,
      flowLastRate: formatFlow(project.flowLastRate),
      flowLastTime: project.flowLastTime,
    };
  });

  //helper function to format date from flow Last Time
  function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day} / ${month} / ${year}`;
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-0">
        <div className="w-full space-y-8 px-4">
          <header>
            {/* Heading */}
            <div className="w-full rounded-xl">
              <div>
                <div className="max-h-[160px] w-full">
                  <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                    <img
                      src={`https://effigy.im/a/${pool?.address}`}
                      className="h-[full] max-h-[160px] w-full overflow-hidden rounded-t-2xl object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                {/* govToken - mimetoken symbol */}

                {/* <span className="inline-flex items-center rounded-md bg-pink-100/10 px-2 py-1 text-xs font-medium text-secondary ring-1 ring-inset ring-pink-400/20 ml-2">
                    {pool?.mimeToken.symbol}
                  </span> */}
              </div>
            </div>

            {/* contract address / owner address */}
          </header>
          <div className="grid grid-cols-1 gap-1  lg:grid-cols-3 ">
            <div className="col-span-2  min-h-[100px] space-y-4  p-4">
              <div className=" flex justify-between">
                <h1 className="flex gap-x-3 text-base leading-7">
                  <span className="text-4xl ">
                    POOL {""}
                    <span className="ml-2 text-primary">{poolName}</span>
                  </span>
                </h1>
                <span className="inline-flex items-center rounded-md bg-secondary_var px-4 py-1 text-xs font-medium">
                  <a
                    href={`https://goerli.etherscan.io/address/${pool?.mimeToken.address}`}
                    target="_blank"
                  >
                    <p className="max-w-content text-Secondary overflow-hidden text-clip">
                      Governance Token: {pool?.mimeToken.name}
                    </p>
                  </a>
                </span>
              </div>
              <div className="py-4 text-justify font-thin text-textSecondary">
                <p>
                  Testing text for demo purpose. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Molestiae a, nihil quis modi,
                  porro sed nostrum accusantium facere error, dolore asperiores?
                  Aliquam maxime, delectus architecto voluptates beatae iste
                  corporis non.
                </p>
              </div>
              <div className="my-4 flex flex-col justify-between space-y-4 rounded-xl bg-background">
                <div className="flex justify-between truncate rounded-lg bg-surface px-4 py-2 transition-transform duration-200 ease-in-out hover:text-textSecondary">
                  <span>contract addres:</span>
                  <a
                    href={`https://goerli.etherscan.io/address/${pool?.address}`}
                    target="_blank"
                    className=""
                  >
                    <span className="">{pool?.address}</span>
                  </a>
                </div>
                <div className="flex justify-between  truncate rounded-lg bg-surface px-4 py-2 transition-transform duration-200 ease-in-out hover:text-textSecondary">
                  <span>owner :</span>
                  <a
                    href={`https://goerli.etherscan.io/address/${pool?.address}`}
                    target="_blank"
                    className=""
                  >
                    <span className="">{pool?.owner}</span>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <aside className="grid h-full grid-cols-1 space-y-2">
                {poolStats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    className={classNames(
                      "flex items-center justify-between rounded-xl bg-surface px-2 py-4 transition-all duration-150 ease-in-out hover:opacity-80 sm:px-6 lg:px-8",
                    )}
                  >
                    <div>
                      <p className="text-md font-medium leading-6 text-textSecondary">
                        {stat.name}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2 ">
                        <span className="w-full text-right text-3xl  tracking-tight text-white">
                          {stat.value}
                        </span>
                        {stat.symbol ? (
                          <span className="max-w-[20px] text-sm text-textSecondary">
                            {stat.symbol}
                          </span>
                        ) : (
                          <span className="min-w-[20px]"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </aside>
            </div>
          </div>

          {/* project table view */}
          <div className="pt-11">
            <div className="mb-10 flex items-center justify-between rounded-md bg-surface py-2">
              <h2 className="px-4 text-base  leading-7 text-white sm:px-6 lg:px-8">
                Round <span className="ml-2 text-xl">10</span>
              </h2>
              <h3 className="px-4 text-base">Timer: </h3>
              <h3 className="px-4 text-base">Last Sync Date: </h3>
            </div>
            <table className="mt-6 w-full whitespace-nowrap text-left">
              <colgroup>
                <col className="w-full sm:w-4/12" />
                <col className="lg:w-4/12" />
                <col className="lg:w-2/12" />
                <col className="lg:w-1/12" />
                <col className="lg:w-1/12" />
              </colgroup>
              <thead className="text-md border-b border-slate-800 leading-6 text-textSecondary">
                <tr>
                  <th scope="col" className="py-2 pl-4 pr-8  sm:pl-6 lg:pl-8">
                    Project
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8  sm:table-cell"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="py-2 pl-0 pr-4 text-right  sm:pr-8 sm:text-left lg:pr-20"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-8  md:table-cell lg:pr-20"
                  >
                    Flow Rate
                  </th>
                  <th
                    scope="col"
                    className="hidden py-2 pl-0 pr-4 text-right  sm:table-cell sm:pr-6 lg:pr-8"
                  >
                    Sync Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {allPoolsProjects.map((item: ItemType) => (
                  <tr key={item.id}>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                      <div className="flex items-center gap-x-4">
                        {/* <img
                            src={item.user.imageUrl}
                            alt=""
                            className="h-8 w-8 rounded-full bg-gray-800"
                          /> */}
                        <div className="flex items-center py-2">
                          <span className="text-primary">
                            {<ProjectIdBadge id={item.id} size="lg" />}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex gap-x-3">
                        <div className=" text-sm leading-6 text-textSecondary">
                          {formatAddress(item.address)}
                        </div>
                        {/* <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-textSecondary ring-1 ring-inset ring-gray-400/20"></span> */}
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                        <div
                          className={classNames(
                            statuses[item.active ? "Active" : "Inactive"],
                            "flex-none animate-pulse rounded-full",
                          )}
                        >
                          <div className="h-2 w-2 rounded-full bg-current" />
                        </div>
                        <div className="hidden text-white sm:block">
                          {item.active ? "Active" : "Inactive"}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-textSecondary md:table-cell lg:pr-20">
                      + {item.flowLastRate} / mo
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-textSecondary sm:table-cell sm:pr-6 lg:pr-8">
                      <time dateTime={item.flowLastTime.toString()}>
                        {formatDate(item.flowLastTime)}
                      </time>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
