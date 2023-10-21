"use client";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { PoolContext } from "@/providers/PoolProvider";
import { PoolsLayout } from "@/components/Pools";
export default function Pools() {
  const { pools } = useContext(PoolContext);

  return (
    <>
      <div className="w-full">
        <PoolsLayout pools={pools} />
      </div>
    </>
  );
}
