"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { Link } from "./Link";
import { EquilibraLogo } from "@/assets";
import { navItems } from "@/constants/navigation";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SideNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="z-10 fixed top-2 left-2 lg:hidden w-fit flex gap-8 items-center justify-between rounded-md p-1 bg-surface border border-grey_mlight">
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
        className={`z-10 lg:translate-x-0 top-0 left-0 fixed flex flex-col gap-y-5 border-r border-grey_mdark bg-surface px-6 w-[320px] lg:w-[280px] h-full ${
          menuOpen ? "translate-x-0" : "-translate-x-[340px] "
        } transition-all duration-700`}
      >
        <div className="flex justify-between h-16 shrink-0 items-center">
          <Link href="/demo/projects">
            <span className="sr-only">Equilibra</span>
            <div className="h-8 w-auto px-1">
              <EquilibraLogo styles="text-primary" />
            </div>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <span className="sr-only">Open main menu</span>
            <XMarkIcon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-between">
          <div className="divide-y divide-grey_mdark">
            <ul role="list" className="-mx-2 space-y-1 mb-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-grey_dark"
                          : "hover:bg-grey_dark hover:text-white",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-grey_light"
                      )}
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0 text-grey_light group-hover:text-white"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ) : (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? "bg-grey_dark"
                                : "hover:bg-grey_dark hover:text-white",
                              "group flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-grey_light"
                            )}
                          >
                            <item.icon
                              className="h-6 w-6 shrink-0 text-grey_light group-hover:text-white"
                              aria-hidden="true"
                            />
                            {item.name}
                            <ChevronRightIcon
                              className={classNames(
                                open
                                  ? "rotate-90 text-grey_light "
                                  : "text-grey_light",
                                "ml-auto h-5 w-5 shrink-0 group-hover:text-white"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel as="ul" className="mt-1 px-2">
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                {/* 44px */}
                                <Disclosure.Button
                                  as="a"
                                  href={subItem.href}
                                  className={classNames(
                                    subItem.current
                                      ? "bg-grey_dark"
                                      : "hover:bg-grey_dark hover:text-white",
                                    "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-grey_light"
                                  )}
                                >
                                  {subItem.name}
                                </Disclosure.Button>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
            <div className="pt-6 justify-center flex">
              <w3m-button label="Connect Wallet" size="md" />
            </div>
          </div>
          <ul role="list" className="-mx-2 space-y-1 mb-2">
            <li>
              <a
                href="/demo"
                className={classNames(
                  false
                    ? "bg-grey_dark"
                    : "hover:bg-grey_dark hover:text-white",
                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-grey_light"
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
      {/* <div
        className={`fixed top-0 left-0 bg-background opacity-80 h-[600px] w-full ${
          menuOpen ? "z-5" : "z-[-1]"
        } transition-all duration-200`}
      ></div> */}
    </>
  );
}
