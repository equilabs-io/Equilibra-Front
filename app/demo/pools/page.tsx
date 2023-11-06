import React from "react";
import PoolCard from "@/components/Pools/PoolCard";
import Link from "next/link";
import { getUrqlClient } from "@/services/urqlService";

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
const poolQuery = `
      query ($id: ID!) {
        osmoticPool(id: $id ) {
          id
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
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full justify-center p-2 lg:p-0"
      >
        {poolsQuery.osmoticPools.map(
          (pool: {
            name: string;
            id: string;
            owner: string;
            address: string;
            fundingToken: string;
            governanceToken: string;
          }) => (
            <li
              key={pool.name}
              className="col-span-1 flex flex-col rounded-lg overflow-hidden"
            >
              <Link href={`/demo/pools/${pool.id}`}>
                <div className="flex flex-1 flex-col p-1">
                  <PoolCard {...pool} />
                </div>
              </Link>
            </li>
          )
        )}
      </ul>
    </>
  );
}
