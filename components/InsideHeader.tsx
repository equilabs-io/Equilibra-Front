import React from 'react';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

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
        <main className="container mx-auto px-6 pb-32 pt-32 md:px-12 lg:px-7 lg:pb-[4.8rem] lg:pt-[4.8rem]">
          <div className="flex flex-wrap items-center px-2 md:px-0">
            <div className="relative space-y-8 lg:w-8/12 lg:py-24 xl:py-32">
              <h2 className="font-bold text-surface_var md:text-7xl lg:w-10/12">
                {title}
              </h2>
              <p className="text-lg text-textSecondary">{description}</p>
            </div>
            <div className="mt-10 flex justify-center md:w-full lg:mt-0 lg:w-1/3">
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
    </>
  );
};
