"use client";
import React from "react";
import { useBalance } from "wagmi";

type BalanceProps = {
  address?: `0x${string}` | undefined;
  token?: `0x${string}` | undefined;
  symbol?: boolean | undefined;
};
const Balance = ({ address, token, symbol = true }: BalanceProps) => {
  const balance = useBalance({
    address: address,
    token: "0x4e17a5e14331038a580C84172386F1bc2461F647",
    chainId: 5,
  });
  const { data, isError, isLoading } = balance;

  const tokenBalance = data?.formatted.slice(0, 6) ?? "";

  const tokenSymbol = data?.symbol ?? "";

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div className="">
      {tokenBalance}
      <span className="ml-1">{symbol && tokenSymbol}</span>
    </div>
  );
};

export default Balance;
