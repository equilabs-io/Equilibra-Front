import React, {useRef} from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
//components
import CustomButton from "@/components/CustomButton";
//assets
import { EquilibraLogo } from "@/assets";
export const Hero: React.FC = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.2, 1, 1, 0.2]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.2, 1, 1, 0.2]
  );

  return (
    <>
      <motion.section
        transition={{ duration: 0.5, ease: "easeInOut" }}
        ref={ref}
        style={{ opacity, scale }}
        className="h-screen flex items-center justify-center relative"
      >
        <div className="flex flex-col items-center space-x-4 gap-20">
          <div className="flex items-center flex-col">
            <div className="flex flex-col md:flex-row items-center mb-6">
              <h1 className="mb-2 mx-4 md:mb-0">Equilibra</h1>
              <EquilibraLogo styles="text-[#00FFC4] w-[120px] h-[70px]" />
            </div>
            <div className="text-center">
              <h3>Redefining how projects are funded</h3>
            </div>
          </div>
          <CustomButton
            text="Launch Demo"
            link="/demo"
            type="button"
            styles="text-lg font-mono bg-primary text-surface rounded-full px-4 py-2 transition-all duration-200 hover:text-primary hover:bg-surface border-2 border-primary"
          />
        </div>
      </motion.section>
    </>
  );
};
