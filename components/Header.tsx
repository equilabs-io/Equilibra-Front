"use client";
import React, { useState, useEffect } from "react";
import { Link } from "../components/Link";
import { NavItem } from "./DropDownMenu";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navItems } from "@/constants/navigation";
import { EquilibraLogo } from "@/assets";
import useDocumentScroll from "@/hooks/useDocumentScroll";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const { currentScrollTop, previousScrollTop } = useDocumentScroll();

  useEffect(() => {
    if (currentScrollTop > previousScrollTop) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [currentScrollTop, previousScrollTop]);

  return (
    <header
      className={`sticky flex transition-all duration-300 ease-in-out z-20 justify-center p-4 ${
        showNav ? "top-0" : "top-[-92px]"
      }`}
    >
      <div className="w-fit flex gap-8 items-center justify-between rounded-full py-2.5 pr-2.5 pl-3 bg-surface border-solid border-2 border-grey_mdark shadow-xl">
        <div className="flex lg:flex-1">
          {/* <a href="/app" className="-m-1.5 p-1.5"> */}
          <Link href="/demo/projects">
            <span className="sr-only">Equilibra</span>
            <div className="h-8 w-auto px-1">
              <EquilibraLogo styles="text-primary" />
            </div>
          </Link>
        </div>
        {/* Items - Links Section */}
        <div className="hidden lg:flex">
          <NavItem
            label={"POOLS"}
            href={"/demo/create-pools"}
            menuItems={[
              {
                label: "Create Pool",
                href: "/demo/create-pool",
              },
              {
                label: "View All",
                href: "/demo",
              },
            ]}
          />
          <NavItem
            label={"PROJECTS"}
            href={"/demo/projects"}
            menuItems={[
              {
                label: "Create Project",
                href: "/demo/create-project",
              },
              {
                label: "View All",
                href: "/demo/projects",
              },
            ]}
          />
          <NavItem
            label={"Contribute"}
            href={"/demo"}
            menuItems={[
              {
                label: "Stake & Support Projects",
                href: "/demo",
              },
            ]}
          />
        </div>
        {/* Wallet Connect Button */}
        <div className="hidden lg:flex">
          <w3m-button balance="show" size="md" label="CONNECT WALLET" />
        </div>
        {/* Mobile Open Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* TODO: add animation and styles to Dialog*/}
      <Dialog
        as="div"
        className="lg:hiddenNav"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-grey_mdark">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Equilibra</span>
              <div className="h-8 w-auto">
                {/* <EquilibraLogo styles="text-primary" /> */}
              </div>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hiddenNav="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-grey_mdark">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-grey_dark"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <w3m-button label="Connect Wallet" />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
