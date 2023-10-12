import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
