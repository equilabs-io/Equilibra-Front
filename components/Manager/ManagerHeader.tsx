"use client";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ProfileHeader } from "../ProfileHeader";

//This component handles address changes and query search params
export const ManagerHeader = () => {
  const { address: participant } = useAccount();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    handleSearch(participant || "");
  }, [participant]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="absolute inset-0  max-h-screen w-full  space-y-10  px-4 py-24 sm:px-6 lg:px-8">
        <header>
          <div className="container mx-auto grid grid-cols-3 px-6 pb-32 pt-32 md:px-12 lg:px-7 lg:pb-[4.8rem] lg:pt-[4.8rem]">
            <div className="relative  col-span-2 space-y-8  lg:py-28 ">
              <h2 className="font-semibold text-surface_var md:text-7xl lg:w-full ">
                Manage you Pools - Projects - Support
              </h2>
              <p className="line-clamp-5 max-w-3xl  text-xl font-thin text-textSecondary">
                Bring your organization ecosystem to the next level by claiming
                and allocating your voting power to support the projects of your
                choice.
              </p>
            </div>
            {/* TODO: improve this section styles and data */}
            <div className="flex flex-col rounded-xl  bg-background px-4 py-6">
              <div className="peer flex h-full w-full flex-col justify-between">
                {stats.map((item) => (
                  <div
                    key={item.name}
                    className="group flex items-center justify-end rounded-lg bg-surface px-4  py-8"
                  >
                    <span className="text-center text-lg text-surface_var transition-all duration-300 ease-in-out group-hover:scale-90">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
        {/* <ProfileHeader /> */}
      </div>
    </div>
  );
};

const stats = [
  { name: "Select a pool & See stats" },
  { name: "Claim voting power" },
  { name: "Support projects" },
  // { name: "Activate Projects", stat: "4" },
];
