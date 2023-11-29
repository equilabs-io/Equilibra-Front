import React from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

type InsideHeaderProps = {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
};

export const InsideHeader = ({
  title,
  description,
  href,
  icon,
}: InsideHeaderProps) => {
  return (
    <>
      <header className="w-full">
        <main className="container m-auto px-6 pt-32 pb-32 md:px-12 lg:pt-[4.8rem] lg:pb-[4.8rem] lg:px-7">
          <div className="flex items-center flex-wrap px-2 md:px-0">
            <div className="relative lg:w-8/12 lg:py-24 xl:py-32 space-y-8">
              <h2 className="font-bold md:text-7xl lg:w-10/12 text-surface_var">
                {title}
              </h2>
              <p className="text-textSecondary text-lg">{description}</p>
            </div>
            <div className="flex justify-center md:w-full lg:w-1/3 mt-10 lg:mt-0">
              <Link href={href}>
                <button
                  type="button"
                  className="inline-flex items-center rounded-2xl border-2 border-dashed border-black bg-white px-8 py-4 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#d7fded] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none  "
                >
                  {icon}
                  <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Create New
                </button>
              </Link>
            </div>
          </div>
        </main>
      </header>
      <div className=" w-full h-10 rounded-full flex items-center justify-center border border-highlight">
        Search
      </div>
    </>
  );
};
