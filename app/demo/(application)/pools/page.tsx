import React from "react";
import Link from "next/link";
import PoolCard from "@/components/Pools/PoolCard";
import { InsideHeader } from "@/components/InsideHeader";
import { getUrqlClient } from "@/services/urqlService";
import { PoolCardProps } from "@/types";

const poolsQuery = `
  query {
    osmoticPools(first: 100) {
      id
      maxActiveProjects
      address
      owner
      mimeToken {
        name
        symbol
      }
      poolProjects(first: 100) {
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
  const poolsQuery = await getAllPools();

  return (
    <>
      <InsideHeader
        title="Dive Into the Funding Ocean"
        description="Shape the future of funding. Create a pool for your organization where conviction voting guides the way and money streams fuel the projects that matter most."
        href="./create-pool"
      />
      <ul
        role="list"
        className="mt-36 grid w-full grid-cols-1 justify-center gap-6 p-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:p-0"
      >
        {poolsQuery.osmoticPools.map((pool: PoolCardProps, index: number) => (
          <li
            key={pool.name}
            className="col-span-1 flex flex-col overflow-hidden rounded-lg"
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
