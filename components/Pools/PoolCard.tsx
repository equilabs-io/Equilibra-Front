import React from "react";

interface PoolCardProps {
  name: string;
  owner: string;
  fundingToken: string;
  governanceToken: string;
  onDepositClick?: () => void;
}

const PoolCard: React.FC<PoolCardProps> = ({
  name = "Pool Name",
  owner,
  fundingToken,
  governanceToken,
  onDepositClick,
}) => {
  return (
    <>
      <div className="rounded-2xl overflow-hidden max-w-[320px] hover:shadow-sm hover:shadow-[#00FF9D] cursor-pointer">
        <div className="bg-[#0C0C0E] rounded-lg shadow">
          <div className="min-h-[170px] bg-gradient-to-r from-cyan-600 to-blue-700"></div>
          {/* Image Here */}
          <div className="px-8 py-7">
            <div className=" mb-5">
              <h3 className="text-2xl font-bold text-primary tracking-tight">
                {name}
              </h3>
              <p className="text-xs text-grey_light">@poolName</p>
            </div>

            <p className="mb-4 font-thin text-xs  text-grey_light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
              vel nemo illum tempore enim dolore, aspernatur rem dolores rerum
              natus.
            </p>
            <div className="mb-12">
              <h4 className="text-xs text-grey_light">
                Governance Token: icon
              </h4>
            </div>
            <div className="">
              <button className="inline-flex  px-3 py-2 text-md font-bold text-background bg-primary rounded-lg w-full text-center items-center justify-center">
                50.000
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolCard;
