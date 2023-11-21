import React from "react";
import { extractColor } from "@/utils";
import { PoolCardProps, PoolProps } from "@/types";
import Balance from "@/components/Balance";

const PoolCard = ({ pool }: PoolProps) => {
  const bgColor = extractColor(pool?.address || "");

  return (
    <>
      <div className="rounded-2xl overflow-hidden  cursor-pointer transition-all ease-in duration-150 group hover:scale-105">
        <div className="bg-surface rounded-lg shadow">
          <div className={`max-h-[170px] w-full bg-surface`}>
            {/* Image */}
            <img
              src={`https://effigy.im/a/${pool?.address}`}
              className="w-full max-h-[170px] object-cover overflow-hidden blur-sm group-hover:blur-none transition-all ease-in duration-150"
            />
          </div>
          <div className="px-8 py-7">
            <div className=" mb-5">
              <h3 className="text-xs font-bold text-textSecondary text-ellipsis overflow-hidden">
                {pool?.address}
              </h3>
              <p className="text-lg text-primary">poolName - {bgColor}</p>
            </div>

            <p className="mb-4 font-thin text-xs  text-grey_light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
              vel nemo illum tempore enim dolore, aspernatur rem dolores rerum
              natus.
            </p>
            <div className="mb-8 text-center">
              <h5 className="text-xs text-grey_light">
                Governance Token:{" "}
                <span className="inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-secondary ring-1 ring-inset ring-pink-400/20 ml-2">
                  {pool?.mimeToken.name}
                </span>
              </h5>
            </div>
            <div className="">
              <button className="inline-flex  px-3 py-2 text-md font-bold text-background bg-primary rounded-lg w-full items-center justify-center">
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
