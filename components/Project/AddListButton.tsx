"use client";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useContractRead } from "wagmi";
import PROJECT_LIST_ABI from "@/constants/abis/OwnableList.json";
import { getStringAfterFirstDash } from "@/lib/format";

type AddListButtonProps = {
  active: boolean;
  id: string;
  projectList?: string[];
  selectedList: {
    name: string;
    id: string;
  };
  projectCheckout: (newId: string) => void;
};

const AddListButton = ({
  id,
  selectedList,
  projectCheckout,
}: AddListButtonProps) => {
  const [clickedOn, setClickedOn] = useState(false);
  const projectId = Number(getStringAfterFirstDash(id));

  const { data } = useContractRead({
    address: selectedList?.id as `0x${string}` | undefined,
    abi: PROJECT_LIST_ABI,
    functionName: "projectExists",
    watch: true,
    args: [projectId],
  });

  const isProjectInList = data;

  // const isIncluded = projectList?.includes(selectedList);

  const handle = (id: any) => {
    projectCheckout(id);
    setClickedOn(true);
  };

  return (
    <>
      <div className="absolute right-4 top-4  flex  justify-end">
        <button
          disabled={isProjectInList as boolean}
          onClick={() => handle(id)}
          className={`flex w-full min-w-[120px] items-center justify-end rounded-md px-4 py-1 transition-all duration-150 ease-in-out ${
            isProjectInList
              ? "bg-surface text-primary"
              : "bg-surface hover:bg-primary"
          }, ${
            clickedOn
              ? "bg-transparent hover:bg-transparent "
              : "hover:text-white"
          } `}
        >
          {`${isProjectInList ? "Listed" : clickedOn ? "" : "Add to Cart"}`}

          {clickedOn && (
            <CheckCircleIcon className="h-8 w-8 rounded-full  bg-surface text-primary" />
          )}
        </button>
      </div>
    </>
  );
};

export default AddListButton;
