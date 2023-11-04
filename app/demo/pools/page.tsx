import React from "react";
import PoolCard from "@/components/Pools/PoolCard";
export default function Pools(): React.ReactElement {
  const pools = [
    {
      name: "Pool Name #1",
      owner: "0x5B...0Fa4dE3",
      fundingToken: "ETHx",
      governanceToken: "ETH",
    },
    {
      name: "Pool Name #2",
      owner: "0x5B...0Taj93",
      fundingToken: "DAIx",
      governanceToken: "ETH",
    },
    {
      name: "Pool Name #3",
      owner: "0x5B...HHHHb3",
      fundingToken: "USDCx",
      governanceToken: "ETH",
    },
  ];
  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full justify-center"
      >
        {pools.map((pool) => (
          <li
            key={pool.name}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-surface  overflow-hidden"
          >
            <div className="flex flex-1 flex-col p-1">
              <PoolCard {...pool} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
