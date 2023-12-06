import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WavesSvg } from "@/assets/WavesSvg";
import { PowerSvg } from "@/assets/PowerSvg";
import { BricksSvg } from "@/assets/BricksSvg";
import PillarCard from "@/components/Landing/PillarCard";

const pillardsInfo = [
  {
    title: "Pools",
    subtitle: "Dive Into the Funding Ocean",
    description:
      "Serve as a mechanism for collecting and distributing funds and support various projects or proposals. Play a significant role in creating a more equitable and effective crowdfunding ecosystem within the decentralized community.",
    image: <WavesSvg styles="fill-primary" />,
  },
  {
    title: "Projects",
    subtitle: "The Next Web3 Giants",
    description:
      "Welcome to the realm of the most fascinating Web3 projects, where every idea has the potential to become an industry disruptor. Join us in building the decentralized landscape of tomorrow.",
    image: <PowerSvg styles="fill-primary" />,
    reverse: true,
    className: "top-24",
  },
  {
    title: "Staking",
    subtitle: "Contributing to the Web3 Ecosystem",
    description:
      "Bring your community ecosystem to the next level by supporting your favorite proyects",
    image: <BricksSvg styles="fill-primary" />,
    className: "top-36",
  },
];

export const PillarsStack = () => {
  return (
    <section className="">
      {pillardsInfo.map((pillar, index) => (
        <PillarCard key={index} {...pillar} />
      ))}
    </section>
  );
};
