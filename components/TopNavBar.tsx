"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useDocumentScroll from "@/hooks/useDocumentScroll";
import Link from "next/link";
import { motion } from "framer-motion";
import { navItems } from "@/constants/navigation";
import { EquilibraLogo } from "@/assets";

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
      transition={{ duration: 0.4 }}
      className={`sticky top-0 flex z-50 justify-center py-4 bg-background  ${
        showNav ? "top-0  transition-all duration-200 ease-in" : "top-[-92px]"
      }`}
    >
      <div className="container m-auto px-6 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-between py-6 gap-6 md:py-4 md:gap-0 relative">
          <input
            type="checkbox"
            name="toggle_nav"
            id="toggle_nav"
            className="peer hidden"
          />
          {/* Logo */}
          <div className="w-full flex justify-between md:w-max md:px-0">
            <Link href="/">
              <span className="sr-only">Equilibra Logo</span>
              <div className="h-8 w-auto px-1">
                <EquilibraLogo styles="text-primary" />
              </div>
            </Link>
            {/* Hambuerger Menu */}
            <div className="flex items-center md:hidden max-h-10">
              <label
                role="button"
                htmlFor="toggle_nav"
                aria-label="humburger"
                id="hamburger"
                className="relative z-40 px-2 py-3 sm:-mr-6"
              >
                <div
                  id="line"
                  className="m-auto h-0.5 w-6 rounded bg-background dark:bg-gray-300 transition duration-300"
                ></div>
                <div
                  id="line2"
                  className="m-auto mt-2 h-0.5 w-6 rounded bg-background dark:bg-gray-300 transition duration-300"
                ></div>
              </label>
            </div>
          </div>

          <label
            role="button"
            htmlFor="toggle_nav"
            className="fixed w-full z-30 h-full top-0 left-0 bg-background bg-opacity-90 hidden peer-checked:block md:peer-checked:hidden"
          ></label>

          {/*mobile config*/}
          <div
            className="flex z-30 flex-col lg:flex-row justify-between 
            items-center gap-y-4 p-6bg-background md:w-8/12 
            md:gap-y-4 md:p-0 
            md:bg-transparent lg:w-7/10 fixed top-0 -left-full transition-all duration-500 peer-checked:left-0 max-w-sm h-full 
            md:left-0 md:h-auto  md:max-w-none w-3/4 md:relative lg:first-letter:top-0"
          >
            {/*logo mobile -none ??  */}

            <div className="block w-full h-full md:h-auto">
              {/* NavLinks */}
              <ul className="space-y-8 tracking-wide font-medium md:flex md:space-y-0 ">
                {pathname !== "/demo" &&
                  navItems.map((item, index) => (
                    <li
                      key={item.name}
                      className="block md:px-3 group relative"
                    >
                      <Link
                        href={`${item.href}`}
                        className={`block md:px-3 group py-2 ${
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
                                            before:absolute before:-inset-2 before:w-full before:h-0.5 before:origin-left  before:mx-auto before:mt-auto before:rounded-full before:bg-primary_var before:transition before:scale-x-0 group-hover:before:scale-x-100"
                        >
                          <span className="transition group-hover:text-primary text-xl ">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Connect Wallet */}
            <div className="w-full gap-y-4 md:gap-y-0 md:gap-x-4 flex justify-end md:flex-row flex-col">
              <span className="sr-only">Connect Wallet</span>{" "}
              <div className="justify-center flex">
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

const Example = ({ showNav }) => {
  return <></>;
};

// <motion.nav
//   initial={{ y: -100 }}
//   animate={{ y: 0 }}
//   transition={{ duration: 0.4 }}
//   className={`sticky flex transition-all duration-300 ease-in-out z-20 bg-background justify-center p-4 ${
//     showNav ? "top-0" : "top-[-92px]"
//   }`}
// >
//   <div className="w-full  flex gap-8 items-center justify-between rounded-full px-3 py-2.5 pr-4 shadow-xl min-w-[30vh] lg:min-w-[50vh]">
//     <Link href="/demo">
//       <span className="sr-only">Equilibra Logo</span>
//       <div className="h-8 w-auto px-1 ">
//         <EquilibraLogo styles="text-primary" />
//       </div>
//     </Link>
//     <div>
//       <span className="sr-only">Connect Wallet</span>
//       <div className="justify-center flex">
//         <w3m-button balance="hide" label="Connect Wallet" size="md" />
//       </div>
//     </div>
//   </div>
//   {/* Mobile Open Button */}
// </motion.nav>
