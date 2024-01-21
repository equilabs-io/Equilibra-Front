"use client";
import React, { useEffect } from "react";
import { getUrqlClient } from "@/services/urqlService";
import { useAccount } from "wagmi";
import { listQuery } from "@/utils";
import { ChevronUpIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Disclosure } from "@headlessui/react";

export const SelectedList = ({
  lists,
  setLists,
  selectedList,
  setSelectedList,
  onClick,
  disabled,
  amount,
}: {
  lists: any;
  setLists: any;
  selectedList: {
    name: string;
    id: string;
  };
  setSelectedList: any;
  onClick?: () => void;
  disabled: boolean;
  amount: number | string;
}) => {
  const { address: owner } = useAccount();

  const fetchListsbyowner = async () => {
    const result = await getUrqlClient().query(listQuery, {
      owner,
    });

    setLists(result.data.projectLists);
  };

  useEffect(() => {
    fetchListsbyowner();
  }, [owner]);

  return (
    <motion.div className="max-h-26 sticky left-0 top-4 z-50 mb-8 flex items-center rounded-lg bg-surface px-4 py-2">
      <div className="flex-[0.3]">
        <h3 className="text-lg">{selectedList && "Management List "}</h3>
      </div>

      {/* //list items */}
      <div className="flex flex-1 items-center justify-center gap-2">
        <ListsItems
          lists={lists}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      </div>

      {/* //kart button */}
      <div className="flex flex-[0.3] justify-end">
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

type ListItems = {
  lists: any[];
  selectedList: {
    name: string;
    id: string;
  };
  setSelectedList: any;
};

const ListsItems = ({ lists, setSelectedList, selectedList }: ListItems) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="relative flex items-center  space-x-4 py-2 hover:opacity-80">
            <span className={`text-lg text-textSecondary`}>
              {selectedList?.name ?? "Select List"}
            </span>
            <ChevronUpIcon
              className={`${
                open
                  ? "rotate-180 transform transition-all duration-200 ease-in-out"
                  : ""
              } h-5 w-5 text-primary`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="absolute left-[43%] top-16 flex flex-col items-baseline rounded-e-lg bg-surface p-4">
            {({ close }) => (
              <div className="flex w-full flex-col">
                {lists &&
                  lists.length > 0 &&
                  lists?.map((list: any, idx: number) => (
                    <>
                      <button
                        className="text-md truncate py-2 text-start text-textSecondary hover:bg-surface hover:text-primary"
                        key={idx}
                        onClick={async () => {
                          // setCurrentPool(pool.address);
                          setSelectedList(list);
                          close();
                        }}
                      >
                        {list.name}
                      </button>
                    </>
                  ))}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
