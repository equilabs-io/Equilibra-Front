"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import FeatureCard from "./FeatureCard";

const featuresInfo = [
  {
    title: "Conviction Voting",
    description:
      "Stake tokens to influence decisions based on commitment and time while experiencing a democratic and transparent system",
    image: <ArrowUpRightIcon />,
    isComingSoon: false,
  },
  {
    title: "Money Streams",
    description:
      "Continuous, autonomous financial flow fueling an array of projects simultaneously. Witness the birth of groundbreaking ideas ",
    image: <ArrowUpRightIcon />,
    isComingSoon: false,
  },
  {
    title: "Gnosis Safe Compatible",
    description:
      "Supports integration with Gnosis Safe for secure transactions",
    image: <ArrowUpRightIcon />,
    isComingSoon: true,
  },
  {
    title: "Managements Lists",
    description: "Tool for efficient project organization and management",
    image: <ArrowUpRightIcon />,
    isComingSoon: true,
  },
  {
    title: "Mother Pool",
    description: "A pool for Pools, a pool for all",
    image: <ArrowUpRightIcon />,
    isComingSoon: true,
  },
  {
    title: "Native Token - EQ",
    description: "A token for the community, by the community",
    image: <ArrowUpRightIcon />,
    isComingSoon: true,
  },
];

export default function Features() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.2, 1, 1, 1],
  );
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.2, 1, 1, 1]);

  return (
    <motion.section
      transition={{ duration: 0.5, ease: "easeInOut" }}
      ref={ref}
      style={{ opacity, scale }}
      className=""
    >
      <h2 className="mb-28 text-center text-5xl">Our Core Features</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 lg:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] xl:grid-cols-3">
        {featuresInfo.map((card) => {
          return <FeatureCard key={card.title} {...card} />;
        })}
      </div>
    </motion.section>
  );
}
