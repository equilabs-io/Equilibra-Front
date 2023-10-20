"use client";
import React from "react";
import WagmiProvider from "./WagmiProvider";
import UrqlProvider from "./UrqlProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UrqlProvider>
      <WagmiProvider>{children}</WagmiProvider>
    </UrqlProvider>
  );
}
