"use client";
import React from "react";
import { WagmiConfig } from "wagmi";
import { goerli, optimism, mainnet } from "wagmi/chains";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

const projectId =
  process.env.NEXT_PUBLIC_PROJECTID || "40ac2f78dc3269b9eed2a91f8319562e";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, optimism, goerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    // "--w3m-accent": "var(--color-primary-var)",
  },
});

export default function WagmiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WagmiConfig config={wagmiConfig}> {children} </WagmiConfig>;
}
