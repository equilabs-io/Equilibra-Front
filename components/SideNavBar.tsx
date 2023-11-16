"use client";
import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/constants/navigation";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function SideNavBar() {
  const currentPath = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedID, setSelectedID] = useState<null | number>(0);

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
        <motion.nav
          className={`flex flex-1 flex-col justify-between`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="divide-y divide-grey_mdark mt-8 sm:max-w-full lg:max-w-[200px]">
            <ul role="list" className="-mx-2 space-y-2">
              {navItems.map((item, index) => (
                <li
                  key={item.name}
                  className="flex items-center group relative"
                >
                  {selectedID === index && (
                    <motion.div
                      layoutId="underline"
                      className="border-2 border-primary rounded-full w-full h-full absolute top-0 left-0 "
                    ></motion.div>
                  )}
                  <Link
                    href={item.href}
                    onClick={() => setSelectedID(index)}
                    className={classNames(
                      item.current
                        ? "bg-grey_dark"
                        : "hover:bg-surface transition-all duration-300 ease-linear ",
                      "flex gap-x-3 rounded-full px-4 py-4 text-lg leading-6 font-mono text-grey_light w-full"
                    )}
                  >
                    <item.icon
                      className={`h-6 w-6 shrink-0 text-grey_light group-hover:text-primary tranistion-all duration-200 ease-linear ${
                        currentPath.includes(item.href) && "text-primary"
                      }`}
                      aria-hidden="true"
                    />

                    {item.name}
                  </Link>
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
        </motion.nav>
      </div>
    </>
  );
}
