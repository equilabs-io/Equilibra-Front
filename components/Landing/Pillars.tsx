"use client";
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
    [0.2, 1, 1, 0.2],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.2, 1, 1, 0.2],
  );
  return (
    <motion.section
      transition={{ duration: 0.5, ease: "easeInOut" }}
      ref={ref}
      style={{ opacity, scale }}
      className="mb-36 flex flex-col items-center"
    >
      <span className="sr-only">Welcome Title & content</span>
      <h2 className="mb-4 text-center text-4xl">
        CrowdFunding in
        <span className="m-2 text-5xl text-primary">3</span>
        Pillars
      </h2>
      <div className="min-h-max max-w-[900px] px-4 text-center md:px-0">
        <p className="font-thin leading-8">
          We are here to change how projects get funded. Whether you are a DAO
          or an organization, we offer tailored solutions for decentralized
          communities. Be a part of the crowdfunding revolution, shaping a
          better tomorrow, many projects at a time.
        </p>
      </div>
    </motion.section>
  );
}
