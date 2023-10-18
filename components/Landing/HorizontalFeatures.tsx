import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

type FeaturesCardProps = {
  title: string;
  description: string;
  image: React.ReactNode;
};

const featuresInfo = [
  {
    title: "Conviction Voting",
    description:
      "Stake tokens to influence decisions based on commitment and time. Experience a democratic and transparent system",
    image: <ArrowUpRightIcon />,
  },
  {
    title: "Money Streams",
    description:
      "Continuous, autonomous financial flow fueling an array of projects simultaneously. Witness the birth of groundbreaking ideas ",
    image: <ArrowUpRightIcon />,
  },
  {
    title: "Gnosis Safe Compatible",
    description:
      "Supports integration with Gnosis Safe for secure transactions",
    image: <ArrowUpRightIcon />,
  },
  {
    title: "Managements Lists",
    description: "Tool for efficient project organization and management",
    image: <ArrowUpRightIcon />,
  },
  {
    title: "Mother Pool",
    description: "A pool for Pools, a pool for all",
    image: <ArrowUpRightIcon />,
  },
  {
    title: "Native Token - EQ",
    description: "A token for the community, by the community",
    image: <ArrowUpRightIcon />,
  },
];

const FeaturesCard = ({ title, description, image }: FeaturesCardProps) => {
  return (
    <>
      <motion.div className="p-4 min-w-[400px] min-h-[300px] rounded-md bg-surface hover:border-2 hover:border-primary bg-gradient-to-b from-[#103029] from-14% to-surface to-86%  cursor-pointer">
        <div className="flex justify-end">
          <ArrowUpRightIcon
            height={"30px"}
            width={"30px"}
            className="text-primary text-right"
          />
        </div>
        <div className="h-full flex flex-col justify-evenly">
          <h3 className="text-4xl text-primary mb-6 text-center">{title}</h3>
          <p className="text-textSecondary font-thin text-center">
            {description}
          </p>
        </div>
      </motion.div>
    </>
  );
};

const HorizontalScrollAnimate = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden space-y-4">
        <motion.div style={{ x }} className="flex gap-8">
          {featuresInfo.map((card) => {
            return <FeaturesCard key={card.title} {...card} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export const HorizontalFeatures: React.FC = () => {
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
  });

  return (
    <>
      {/* <motion.h2
        animate={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-center text-5xl sticky top-20"
      >
        Unleash the Power of Our Features
      </motion.h2> */}

      <HorizontalScrollAnimate />
    </>
  );
};
