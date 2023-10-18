"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navItems } from "@/constants/navigation";
import LogoSvg from "@/assets";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/app" className="-m-1.5 p-1.5">
            <span className="sr-only">Equilibra</span>
            <div className="h-8 w-auto">
              <LogoSvg styles="text-primary" />
            </div>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-sm font-semibold leading-6 "
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <w3m-button balance="show" size="md" label="Connect Wallet" />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-grey_mdark">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Equilibra</span>
              <div className="h-8 w-auto">
                <LogoSvg styles="text-primary" />
              </div>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
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
                <w3m-button balance="show" size="md" label="Connect Wallet" />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
