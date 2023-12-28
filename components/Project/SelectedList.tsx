"use client";
import React, { useEffect } from "react";
import { getUrqlClient } from "@/services/urqlService";
import { useAccount } from "wagmi";
import { listQuery } from "@/utils";
import { formatAddress } from "@/lib/format";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export const SelectedList = ({
  lists,
  setLists,
  onClick,
  disabled,
  amount,
}: {
  lists: any;
  setLists: any;
  onClick?: () => void;
  disabled: boolean;
  amount: number | string;
}) => {
  const { address: owner } = useAccount();

  const fetchListsbyowner = async () => {
    const result = await getUrqlClient().query(listQuery, {
      owner,
    });
    // console.log(result.data.projectLists);
    setLists(result.data.projectLists);
  };

  useEffect(() => {
    fetchListsbyowner();
  }, [owner]);

  if (!lists.length) {
    return <h3>Must by owner of list to add projects</h3>;
  }

  return (
    <motion.div className="sticky left-0 top-4 z-20 mb-8 flex items-center rounded-lg  bg-surface px-4 py-0">
      <div className="max-w-64">
        <h1 className="text-lg">Your Management Lists</h1>
      </div>
      {lists?.map((list: { name: string; id: string }) => (
        <div
          key={list.id}
          className="grow space-x-4 text-center text-surface_var"
        >
          <span className="">{list.name}</span>
          <span>{formatAddress(list.id)}</span>
        </div>
      ))}

      <div className="flex w-64  justify-end">
        <button
          onClick={onClick}
          disabled={disabled}
          className="p-2 text-primary disabled:cursor-not-allowed disabled:text-highlight"
        >
          <ShoppingCartIcon className="h-8 w-8" />
          <span>{amount}</span>
        </button>
      </div>
    </motion.div>
  );
};
