"use client"
import React from "react";
import WagmiProvider from "./WagmiProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiProvider>{children}</WagmiProvider>;
}
