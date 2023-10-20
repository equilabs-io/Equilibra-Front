import React from "react";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6x flex-auto flex flex-col">
      <Header />
      <div className="flex flex-col justify-between flex-auto">
        <main className="mx-auto w-full flex max-w-7xl items-start justify-between py-6 lg:px-6  min-h-[200vh]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
