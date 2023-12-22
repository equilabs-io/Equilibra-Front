"use client";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
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
  const [selectedList, setSelectedList] = useState("Peepo");

  const isIncluded = projectList?.includes(selectedList);

  const hanlde = (id: any) => {
    projectCheckout(id);
    setClickedOn(true);
  };

  return (
    <>
      <div className="absolute right-4 top-4  flex  justify-end">
        <button
          disabled={isIncluded}
          onClick={() => hanlde(id)}
          className={`flex w-full min-w-[170px] items-center justify-center rounded-md px-4 transition-all duration-200 ease-in ${
            isIncluded
              ? "border bg-highlight text-black"
              : "bg-surface hover:bg-primary"
          }, ${
            clickedOn
              ? "justify-evenly  bg-transparent hover:bg-transparent"
              : "text-surface_var hover:text-white"
          } `}
        >
          {`${isIncluded ? "Listed" : clickedOn ? "Added" : "Add to Cart"}`}
          {clickedOn && <CheckCircleIcon className="h-6 w-6 text-primary" />}
        </button>
      </div>
    </>
  );
};

export default AddListButton;
