"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Manager from "./Manager";
import { ProfileHeader } from "./ProfileHeader";

//This component handles address changes and query search params
export const ManagerHeader = () => {
  const { address: participant } = useAccount();

  const [openManager, setOpenManager] = useState(false);

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
        {/* Header */}
        <ProfileHeader />

        {/* open manager button */}
        <div className="absolute left-0 top-[80%] flex w-full justify-center">
          <button
            onClick={() => setOpenManager(true)}
            className="rounded-full border px-8 py-4 text-4xl uppercase"
          >
            open Manager
          </button>
        </div>

        {/* manager comp */}

        {openManager && (
          <div className="absolute inset-x-0 inset-y-4 flex bg-background">
            <button
              onClick={() => setOpenManager(false)}
              className="absolute right-5 top-14 rounded-full px-2 py-2 text-xl uppercase text-textSecondary "
            >
              X
            </button>
            {/* <Manager pools={queryPoolbyOwner.slice(-2)} /> */}
          </div>
        )}
      </div>
    </div>
  );
};
