import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Pillars() {
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
    <motion.section
      transition={{ duration: 0.5, ease: "easeInOut" }}
      ref={ref}
      style={{ opacity, scale }}
      className="flex flex-col items-center mb-36"
    >
      <span className="sr-only">Welcome Title & content</span>
      <h2 className="mb-4 text-center text-4xl">
        CrowdFunding in
        <span className="text-primary text-5xl m-2">3</span>
        Pillars
      </h2>
      <div className="max-w-[900px] text-center px-4 md:px-0 min-h-max">
        <p className="leading-8 font-thin">
          We are here to change how projects get funded. Whether you are a DAO
          or an organization, we offer tailored solutions for decentralized
          communities. Be a part of the crowdfunding revolution, shaping a
          better tomorrow, many projects at a time.
        </p>
      </div>
    </motion.section>
  );
}
