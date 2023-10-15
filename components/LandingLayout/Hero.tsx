import React from "react";
import LogoSvg from "@/assets";

export const Hero: React.FC = () => {
  return (
    <div className="h-[90vh] border-2 flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <h1>Equilibra</h1>
        <LogoSvg styles="text-cyan-100" />
      </div>
    </div>
  );
};
