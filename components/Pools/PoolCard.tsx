import React from "react";
import { extractColor } from "@/utils";
import { PoolCardProps, PoolProps } from "@/types";
import Balance from "@/components/Balance";

const PoolCard = ({ pool }: PoolProps) => {
  const bgColor = extractColor(pool?.address || "");

  return (
    <>
      <div className="group cursor-pointer  overflow-hidden rounded-2xl transition-all duration-150 ease-in hover:scale-105">
        <div className="rounded-lg bg-surface shadow">
          <div className={`max-h-[170px] w-full bg-surface`}>
            {/* Image */}
            <img
              src={`https://effigy.im/a/${pool?.address}`}
              className="max-h-[170px] w-full overflow-hidden object-cover blur-sm transition-all duration-150 ease-in group-hover:blur-none"
            />
          </div>
          <div className="px-8 py-7">
            <div className=" mb-5">
              <h3 className="overflow-hidden text-ellipsis text-xs font-bold text-textSecondary">
                {pool?.address}
              </h3>
              <p className="text-lg text-primary">poolName - {bgColor}</p>
            </div>

            <p className="mb-4 text-xs font-thin  text-textSecondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
              vel nemo illum tempore enim dolore, aspernatur rem dolores rerum
              natus.
            </p>
            <div className="mb-8 text-center">
              <h5 className="text-xs text-textSecondary">
                Governance Token:{" "}
                <span className="bg-secondary_var ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-secondary">
                  {pool?.mimeToken.name}
                </span>
              </h5>
            </div>
            <div className="">
              <button className="text-md  inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 font-bold text-background">
                <Balance address={pool?.address} />
                {/* <span className="h-4 w-4 border-2 rounded-full ml-2 border-slate-900"></span> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolCard;
