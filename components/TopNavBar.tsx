"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EquilibraLogo } from "@/assets";
import { navItems } from "@/constants/navigation";
import useDocumentScroll from "@/hooks/useDocumentScroll";
import { motion } from "framer-motion";

export default function TopNavBar() {
  const [showNav, setShowNav] = useState(true);
  const [selectedID, setSelectedID] = useState<null | number>(2);
  const pathname = usePathname();

  const { currentScrollTop, previousScrollTop } = useDocumentScroll();

  useEffect(() => {
    if (currentScrollTop > previousScrollTop) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [currentScrollTop, previousScrollTop]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 flex justify-center bg-background py-4 ${
        showNav ? "top-0 transition-all duration-200 ease-in" : "top-[-92px]"
      }`}
    >
      <div className="container m-auto px-6 md:px-12 lg:px-7">
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-6 md:gap-0 md:py-4">
          <input
            type="checkbox"
            name="toggle_nav"
            id="toggle_nav"
            className="peer hidden"
          />
          {/* Logo */}
          <div className="flex w-full justify-between md:w-max md:px-0">
            <Link href="/">
              <span className="sr-only">Equilibra Logo</span>
              <div className="h-8 w-auto px-1">
                <EquilibraLogo styles="text-primary" />
              </div>
            </Link>
            {/* Hambuerger Menu */}
            <div className="flex max-h-10 items-center md:hidden">
              <label
                role="button"
                htmlFor="toggle_nav"
                aria-label="humburger"
                id="hamburger"
                className="relative z-40 px-2 py-3 sm:-mr-6"
              >
                <div
                  id="line"
                  className="m-auto h-0.5 w-6 rounded bg-background transition duration-300 dark:bg-gray-300"
                ></div>
                <div
                  id="line2"
                  className="m-auto mt-2 h-0.5 w-6 rounded bg-background transition duration-300 dark:bg-gray-300"
                ></div>
              </label>
            </div>
          </div>

          <label
            role="button"
            htmlFor="toggle_nav"
            className="fixed left-0 top-0 z-30 hidden h-full w-full bg-background bg-opacity-90 peer-checked:block md:peer-checked:hidden"
          ></label>

          {/*mobile config*/}
          <div
            className="p-6bg-background lg:w-7/10 fixed -left-full top-0 
            z-30 flex h-full w-3/4 
            max-w-sm flex-col 
            items-center justify-between gap-y-4 transition-all duration-500 peer-checked:left-0 md:relative md:left-0 md:h-auto md:w-8/12 
            md:max-w-none md:gap-y-4  md:bg-transparent md:p-0 lg:flex-row lg:first-letter:top-0"
          >
            {/*logo mobile -none ??  */}

            <div className="block h-full w-full md:h-auto">
              {/* NavLinks */}
              <ul className="space-y-8 font-medium tracking-wide md:flex md:space-y-0 ">
                {pathname !== "/demo" &&
                  navItems.map((item, index) => (
                    <li
                      key={item.name}
                      className="group relative block md:px-3"
                    >
                      <Link
                        href={`${item.href}`}
                        className={`group block py-2 md:px-3 ${
                          selectedID === index && "text-primary"
                        }`}
                        onClick={() => setSelectedID(index)}
                      >
                        {/* border anim with layoutId */}

                        {/* {selectedID === index && (
                        <motion.div
                          layoutId="underline"
                          className="border-2 border-primary rounded-full w-full h-full absolute top-0 left-0 "
                        ></motion.div>
                      )} */}
                        <div
                          className="relative
                                            before:absolute before:-inset-2 before:mx-auto before:mt-auto before:h-0.5  before:w-full before:origin-left before:scale-x-0 before:rounded-full before:bg-primary_var before:transition group-hover:before:scale-x-100"
                        >
                          <span className="text-xl transition group-hover:text-primary ">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Connect Wallet */}
            <div className="flex w-full flex-col justify-end gap-y-4 md:flex-row md:gap-x-4 md:gap-y-0">
              <span className="sr-only">Connect Wallet</span>{" "}
              <div className="flex justify-center">
                {" "}
                <w3m-button
                  balance="hide"
                  label="Connect Wallet"
                  size="md"
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
