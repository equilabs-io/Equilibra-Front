import React from "react";
//hooks
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
//components
import { LaunchAppButton } from "@/components/Buttons";

// ....
//assets
import LogoSvg from "@/assets";

export const Hero: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <>
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="h-screen flex items-center justify-center relative"
      >
        <LaunchAppButton />
        <div className="flex flex-col md:flex-row items-center space-x-4">
          <h1 className="mb-2 md:mb-0">Equilibra</h1>
          <LogoSvg styles="text-[#00FFC4] w-[120px] h-[70px]" />
        </div>
      </motion.section>
      <div className="h-[100vh]"></div>
    </>
  );
};
