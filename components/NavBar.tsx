"use client";
import React, { useState, useEffect } from "react";
import { Link } from "./Link";
import { NavItem } from "./DropDownMenu";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { oldNavs } from "@/constants/navigation";
import { EquilibraLogo } from "@/assets";
import useDocumentScroll from "@/hooks/useDocumentScroll";

export default function NavBar() {
  const [showNav, setShowNav] = useState(false);

  const { currentScrollTop, previousScrollTop } = useDocumentScroll();

  useEffect(() => {
    if (currentScrollTop > previousScrollTop) {
      setShowNav(false);
    } else {
      //TODO: put it in false so not to show the nav bar when scrolling up
      setShowNav(false);
    }
  }, [currentScrollTop, previousScrollTop]);

  return (
    <nav
      className={`sticky flex transition-all duration-300 ease-in-out z-20 justify-center p-4 mb-8 ${
        showNav ? "top-0" : "top-[-92px]"
      }`}
    >
      <div className="w-fit flex gap-8 items-center justify-between rounded-full px-3 py-2.5 pr-4 bg-background shadow-xl min-w-[30vh] lg:min-w-[50vh]">
        <Link href="/demo">
          <span className="sr-only">Equilibra Logo</span>
          <div className="h-8 w-auto px-1 ">
            <EquilibraLogo styles="text-primary" />
          </div>
        </Link>
        <div>
          <span className="sr-only">Connect Wallet</span>
          <div className="justify-center flex">
            <w3m-button balance="hide" label="Connect Wallet" size="md" />
          </div>
        </div>
      </div>
      {/* Mobile Open Button */}
    </nav>
  );
}
