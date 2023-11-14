"use client";
import { useState } from "react";
import { navItems } from "@/constants/navigation";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function SideNavBar() {
  // TODO: check isConnected state not manteining when reload page
  const { isConnected } = useAccount({});
  const currentPath = usePathname();

  //helper to go to the next url path via the
  // const nextUrlPath = currentPath
  //   .substring(currentPath.lastIndexOf("/") + 1)
  //   .slice(0, -1);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="z-10 fixed top-2  left-2 lg:hidden w-fit flex gap-8 items-center justify-between rounded-md p-1 bg-surface border-grey_mlight">
        <div className="hidden lg:flex">
          <w3m-button balance="show" size="md" label="CONNECT WALLET" />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-1"
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className={`z-50 lg:translate-x-0 top-0 left-0 fixed flex flex-col gap-y-5 bg-background border-grey_mdark px-6 w-[320px] lg:w-[280px] h-full ${
          menuOpen ? "translate-x-0" : "-translate-x-[340px] "
        } transition-all duration-700}`}
      >
        <div className="flex justify-between h-16 shrink-0 items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <span className="sr-only">Open main menu</span>
            <XMarkIcon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <nav
          className={`flex flex-1 flex-col justify-between
          } `}
        >
          <div className="divide-y divide-grey_mdark mt-8 sm:max-w-full lg:max-w-[200px]">
            <ul role="list" className="-mx-2 space-y-2">
              {navItems.map((item) => (
                <li key={item.name} className="flex items-center group">
                  <a
                    href={item.href}
                    className={classNames(
                      item.current ? "bg-grey_dark" : "hover:bg-surface",
                      currentPath.includes(item.href) &&
                        item.href !== "/demo" &&
                        "bg-surface border-2 border-primary transition-all duration-500 ease-in",
                      //TODO: example here
                      // isConnected ? "text-secondary" : "text-grey_light",
                      "flex gap-x-3 rounded-full px-4 py-4 text-lg leading-6 font-mono text-grey_light w-full"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0 text-grey_light group-hover:text-primary"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation button */}
          <ul role="list" className="-mx-2 space-y-1 mb-2">
            <li>
              <a
                href="/demo"
                className={classNames(
                  false
                    ? "bg-grey_dark"
                    : "hover:bg-grey_dark hover:text-white",
                  "group flex gap-x-3 rounded-md p-4 text-md leading-6 font-mono text-grey_light"
                )}
              >
                <ClipboardDocumentCheckIcon
                  className="h-6 w-6 shrink-0 text-grey_light group-hover:text-white"
                  aria-hidden="true"
                />
                Documentation
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
