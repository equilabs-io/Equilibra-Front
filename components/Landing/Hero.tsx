import React from "react";
//hooks
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
//components
import CustomButton from "@/components/CustomButton";
//assets
import { EquilibraLogo } from "@/assets";
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
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        ref={heroRef}
        style={{ opacity, scale }}
        className="h-screen flex items-center justify-center relative"
      >
        <div className={`w-full absolute top-0 p-6 flex justify-end`}>
          <CustomButton
            text="Launch Demo"
            link="/demo"
            type="button"
            styles="text-lg font-mono bg-surface text-primary rounded-full px-4 py-2 transition-all duration-200 hover:text-white"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center space-x-4">
          <h1 className="mb-2 md:mb-0">Equilibra</h1>
          <EquilibraLogo styles="text-[#00FFC4] w-[120px] h-[70px]" />
        </div>
      </motion.section>
    </>
  );
};
