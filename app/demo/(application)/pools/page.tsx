import React from "react";
import Link from "next/link";
import PoolCard from "@/components/Pools/PoolCard";
import { InsideHeader } from "@/components/InsideHeader";
import { getUrqlClient } from "@/services/urqlService";
import { PoolCardProps } from "@/types";

const poolsQuery = `
  query {
    osmoticPools(first: 10) {
      id
      maxActiveProjects
      address
      owner
      mimeToken {
        name
        symbol
      }
      poolProjects(first: 10) {
        id
      }
    }
  }
`;

const getAllPools = async () => {
  const projectsQueryResult = await getUrqlClient().query(poolsQuery, {});
  return projectsQueryResult.data;
};

export default async function Pools() {
  //TODO: erase this TimeOut, just for testing loading state

  const poolsQuery = await getAllPools();

  return (
    <>
      <InsideHeader
        title="Dive Into the Funding Ocean"
        description="Collect and distribute funds while supporting various projects. Create a more equitable and effective crowdfunding ecosystem within your decentralized community."
        href="./create-pool"
      />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full justify-center p-2 lg:p-0 mt-36"
      >
        {poolsQuery.osmoticPools.map((pool: PoolCardProps, index: number) => (
          <li
            key={pool.name}
            className="col-span-1 flex flex-col rounded-lg overflow-hidden"
          >
            <Link href={`/demo/pools/${pool.id}`}>
              <div className="flex flex-1 flex-col p-1">
                <PoolCard pool={pool} index={index} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
