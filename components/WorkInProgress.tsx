import React from "react";
import CustomButton from "./CustomButton";

export default function WorkInProgress() {
  return (
    <>
      <div className="w-full py-24">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">WIP</p>
          <h1 className="mt-4 font-bold tracking-tight">Work in Progress</h1>
          <p className="mt-6">
            This page is currently under construction. Please check back later.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <CustomButton text="Go back home" link="/demo/projects" />
          </div>
        </div>
      </div>
    </>
  );
}
