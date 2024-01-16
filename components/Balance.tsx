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
    token: "0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947",
    chainId: 5,
  });
  const { data, isError, isLoading } = balance;

  const tokenBalance = data?.formatted.slice(0, 5) ?? "";
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
