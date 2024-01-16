import React from "react";
import Web3Modal from "./Web3Modal";
import UrqlProvider from "./UrqlProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UrqlProvider>
      <Web3Modal>{children}</Web3Modal>
    </UrqlProvider>
  );
}
