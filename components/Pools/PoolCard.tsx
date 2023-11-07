import React from "react";
import { extractColor } from "@/utils";
import { PoolCardProps, PoolProps } from "@/types";

const PoolCard = ({ pool }: PoolProps) => {
  const bgColor = extractColor(pool?.address || "");
  const randomNumber = Math.floor(Math.random() * 10000 + 8000);

  return (
    <>
      <div className="rounded-2xl overflow-hidden hover:shadow-sm hover:shadow-[#00FF9D] cursor-pointer">
        <div className="bg-[#0C0C0E] rounded-lg shadow">
          <div className={`min-h-[170px] w-full bg-surface`}></div>
          {/* Image Here */}
          <div className="px-8 py-7">
            <div className=" mb-5">
              <h3 className="text-2xl font-bold text-primary text-ellipsis overflow-hidden">
                {pool?.address}
              </h3>
              <p className="text-xs text-grey_light">@poolName - {bgColor}</p>
            </div>

            <p className="mb-4 font-thin text-xs  text-grey_light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
              vel nemo illum tempore enim dolore, aspernatur rem dolores rerum
              natus.
            </p>
            <div className="mb-8 text-center">
              <h5 className="text-xs text-grey_light">
                Governance Token:{" "}
                <span className="inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 ring-1 ring-inset ring-pink-400/20 ml-2">
                  {pool?.mimeToken.name}
                </span>
              </h5>
            </div>
            <div className="">
              <button className="inline-flex  px-3 py-2 text-md font-bold text-background bg-primary rounded-lg w-full items-center justify-center">
                ${randomNumber}
                <span className="h-4 w-4 border-2 rounded-full ml-2 border-slate-900"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolCard;
