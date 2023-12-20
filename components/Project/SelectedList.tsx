"use client";
import React, { useEffect, useState } from "react";
import { getUrqlClient } from "@/services/urqlService";
import { useAccount } from "wagmi";
import { listQuery } from "@/utils";
import { formatAddress } from "@/lib/format";

export const SelectedList = ({
  lists,
  setLists,
}: {
  lists: any;
  setLists: any;
}) => {
  const { address: owner } = useAccount();

  const fetchListsbyowner = async () => {
    const result = await getUrqlClient().query(listQuery, {
      owner,
    });
    console.log(result.data.projectLists);
    setLists(result.data.projectLists);
  };

  useEffect(() => {
    fetchListsbyowner();
  }, [owner]);

  if (!lists.length) {
    return <h3>Must by owner of list to add projects</h3>;
  }

  return (
    <div className="-mt-28 mb-8 border-2 py-4">
      <h1 className="text-2xl font-semibold">Your Management Lists</h1>
      {/* {!lists.length && <h3>Cant add projects with this account</h3>} */}
      {lists?.map((list: { name: string; id: string }) => (
        <div key={list.id} className="space-x-4">
          <span className="">{list.name}</span>
          <span>{formatAddress(list.id)}</span>
        </div>
      ))}
    </div>
  );
};
