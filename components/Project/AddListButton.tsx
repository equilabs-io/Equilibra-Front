"use client";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useContractRead } from "wagmi";
import PROJECT_LIST_ABI from "@/constants/abis/OwnableList.json";
import { getStringAfterFirstDash } from "@/lib/format";

type AddListButtonProps = {
  active: boolean;
  id: string;
  projectList?: string[];
  projectCheckout: (newId: string) => void;
};

const AddListButton = ({
  active,
  id,
  projectList,
  projectCheckout,
}: AddListButtonProps) => {
  const [clickedOn, setClickedOn] = useState(false);
  const projectId = Number(getStringAfterFirstDash(id));
  const [selectedList, setSelectedList] = useState("Peepo");

  const { data, isLoading } = useContractRead({
    address: "0x52F0FfF2018782C32863cd215d935AE65387F493",
    abi: PROJECT_LIST_ABI,
    functionName: "projectExists",
    watch: true,
    args: [projectId],
  });

  const isProjectInList = data;

  const isIncluded = projectList?.includes(selectedList);

  const hanlde = (id: any) => {
    projectCheckout(id);
    setClickedOn(true);
  };

  return (
    <>
      <div className="absolute right-4 top-4  flex  justify-end">
        <button
          disabled={isProjectInList}
          onClick={() => hanlde(id)}
          className={`flex w-full min-w-[170px] items-center justify-center rounded-md px-4 transition-all duration-200 ease-in ${
            isProjectInList
              ? "border bg-highlight text-black"
              : "bg-surface hover:bg-primary"
          }, ${
            clickedOn
              ? "justify-evenly  bg-transparent hover:bg-transparent"
              : "text-surface_var hover:text-white"
          } `}
        >
          {`${
            isProjectInList ? "Listed" : clickedOn ? "Added" : "Add to Cart"
          }`}

          {clickedOn && <CheckCircleIcon className="h-6 w-6 text-primary" />}
        </button>
      </div>
    </>
  );
};

export default AddListButton;
