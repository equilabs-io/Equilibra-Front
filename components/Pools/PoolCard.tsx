import React from "react";
import { extractColor } from "@/utils";

interface PoolCardProps {
  id?: string;
  onDepositClick?: () => void;
}

const PoolCard: React.FC<PoolCardProps> = ({ id }) => {
  const bgColor = extractColor("0x5BE8Bb8d7923879c3DDc9c551C5Aa85Ad0Fa4dE3");

  return (
    <>
      <div className="rounded-2xl overflow-hidden hover:shadow-sm hover:shadow-[#00FF9D] cursor-pointer">
        <div className="bg-[#0C0C0E] rounded-lg shadow">
          <div
            className={`min-h-[170px] bg-gradient-to-r from-cyan-600 to-[${bgColor}]`}
          ></div>
          {/* Image Here */}
          <div className="px-8 py-7">
            <div className=" mb-5">
              <h3 className="text-2xl font-bold text-primary text-ellipsis overflow-hidden border-2">
                {id}
              </h3>
              <p className="text-xs text-grey_light">@poolName</p>
            </div>

            <p className="mb-4 font-thin text-xs  text-grey_light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
              vel nemo illum tempore enim dolore, aspernatur rem dolores rerum
              natus.
            </p>
            <div className="mb-12">
              <h5 className="text-xs text-grey_light">Governance Token: {}</h5>
            </div>
            <div className="">
              <button className="inline-flex  px-3 py-2 text-md font-bold text-background bg-primary rounded-lg w-full items-center justify-center">
                50.000
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
