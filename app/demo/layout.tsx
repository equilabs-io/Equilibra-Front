import React from "react";
import { Footer } from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SideNavBar from "@/components/SideNavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="max-w-6x flex-auto flex flex-col relative min-h-screen">
    <div className="flex relative">
      <SideNavBar />
      <div className="max-w-6x flex-auto flex flex-col min-h-screen lg:ml-[280px] mt-11 lg:mt-0">
        {/* <NavBar/> */}
        <div className="flex flex-col justify-between flex-auto">
          <main className="mx-auto w-full flex max-w-7xl items-start justify-between py-6 lg:px-6">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
