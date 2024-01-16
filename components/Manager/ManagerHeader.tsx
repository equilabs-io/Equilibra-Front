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
        <ProfileHeader />
      </div>
    </div>
  );
};
