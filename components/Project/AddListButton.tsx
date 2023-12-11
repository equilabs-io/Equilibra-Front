"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type AddListButtonProps = {
  active: boolean;
  id: string;
  arrayOfIds: string[];
};
function getFirstLetterAfterHyphen(str: string): string {
  const hyphenIndex = str.indexOf("-");
  if (hyphenIndex !== -1 && hyphenIndex < str.length - 1) {
    return str.charAt(hyphenIndex + 1);
  }
  return "";
}

const AddListButton = ({ active, id, arrayOfIds }: AddListButtonProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [ArrayofIds, setArrayofIds] = useState<string[]>(["0", "2"]);
  const addIdToArray = (newId: string) => {
    setArrayofIds((prevIds) => [...prevIds, newId]);
  };

  return (
    <>
      <div className="absolute right-4 top-4  flex  justify-end">
        <button
          disabled={active}
          onClick={() => addIdToArray(id)}
          className={`w-full min-w-[170px] rounded-md px-4 ${
            active
              ? "bg-primary text-black"
              : "bg-surface text-white hover:bg-primary hover:text-black"
          }`}
        >
          {`${active ? "Listed" : "Add to list"}`}
        </button>
      </div>
    </>
  );
};

export default AddListButton;
