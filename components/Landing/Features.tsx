import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import WaveSvg from "@/assets/WavesSvg";
import PowerSvg from "@/assets/PowerSvg";
import BricksSvg from "@/assets/BricksSvg";
export const Features = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const fadeIn = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scaleIn = useTransform(scrollYProgress, [0.1, 0.3], [0.5, 1]);

  const fadeInOutShadow = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const FeatureCard = () => {};

  return (
    <>
      <section ref={targetRef} className="min-h-[200vh]  mt-[200px]">
        <motion.div
          style={{ opacity: fadeIn, scale: scaleIn }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="flex px-16 py-4  justify-around sticky top-0 rounded-2xl bg-secondary"
        >
          <div className="h-96 w-96">
            <WaveSvg styles="" />
          </div>
          <div className="text-center  flex-grow flex flex-col max-w-md">
            <h2>Pools: Dive Into the Funding Ocean</h2>
            <p>
              Explore a wide variety of handpicked pools carefully designed for
              specific Web3 projects, nurturing them from inception to
              full-fledged reality.
            </p>
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: fadeIn, scale: scaleIn }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="flex px-16 py-4 justify-around flex-row-reverse sticky top-[60px] bg-background rounded-md  "
        >
          <div className="h-96 w-96">
            <BricksSvg styles="" />
          </div>
          <div className="text-center  flex-grow flex flex-col max-w-md z-50 rounded-md ">
            <h2>bricks: Dive Into the Funding Ocean</h2>
            <p>
              Explore a wide variety of handpicked pools carefully designed for
              specific Web3 projects, nurturing them from inception to
              full-fledged reality.
            </p>
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: fadeIn, scale: scaleIn }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className=" flex px-16 py-4  justify-around sticky top-[120px] bg-secondary rounded-md"
        >
          <div className="h-96 w-96">
            <PowerSvg styles="" />
          </div>
          <div className="text-center  flex-grow flex flex-col max-w-md">
            <h2>Pools: Dive Into the Funding Ocean</h2>
            <p>
              Explore a wide variety of handpicked pools carefully designed for
              specific Web3 projects, nurturing them from inception to
              full-fledged reality.
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
};
