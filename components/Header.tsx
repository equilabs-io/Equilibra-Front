"use client";
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navItems } from "@/constants/navigation";
import LogoSvg from "@/assets";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8"
      >
        <div className="m-[1px] flex w-full max-w-4xl items-center justify-between rounded-full py-2.5 pr-2.5 pl-3 shadow-2xl transition-width duration-200 ease-in-out bg-surface">
          <div className="flex lg:flex-1">
            <a href="/app" className="-m-1.5 p-1.5">
              <span className="sr-only">Equilibra</span>
              <div className="h-8 w-auto">
                <LogoSvg styles="text-primary" />
              </div>
            </a>
          </div>

          {/* Items - Links Section */}
          <div className="hidden lg:flex lg:gap-x-8 ">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="font-bold uppercase hover:opacity-7 hover:opacity-80 transition-all duration-250 ease-in-out"
              >
                {item.name}
              </a>
            ))}
          </div>
          {/* Wallter Connect Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <w3m-button balance="show" size="md" label="CONNECT" />
          </div>
        </div>
      </motion.nav>
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
      {/* Mobile Menu */}
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

("fixed z-50 w-full text-gray-900 bg-white bg-opacity-50 dark:bg-dark dark:text-gray-100 backdrop-filter backdrop-blur-lg dark:bg-opacity-50");
