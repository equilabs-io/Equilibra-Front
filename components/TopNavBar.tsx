"use client";
import React, { useState, useEffect } from "react";
import useDocumentScroll from "@/hooks/useDocumentScroll";
import { motion } from "framer-motion";
import { Link } from "./Link";
import { EquilibraLogo } from "@/assets";

export default function TopNavBar() {
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
      className={`sticky flex transition-all duration-300 ease-in-out z-20 justify-center p-4 ${
        showNav ? "top-0" : "top-[-92px]"
      }`}
    >
      <div className="w-fit flex gap-8 items-center justify-between rounded-full px-3 py-2.5 pr-4 shadow-xl min-w-[30vh] lg:min-w-[50vh]">
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
    </motion.nav>
  );
}
