"use client";
import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type cardProps = {
  title: string;
  subtitle: string;
  description: string;
  image: ReactNode;
  className?: string;
  reverse?: boolean;
};

export default function PillarCard({
  title,
  subtitle,
  description,
  image,
  className,
  reverse = false,
}: cardProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.4, 1, 1, 0.4],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.4, 1, 1, 0.4],
  );
  return (
    <>
      <motion.div
        transition={{ duration: 0.5, ease: "easeInOut" }}
        ref={ref}
        style={{ opacity, scale }}
        className={`flex flex-col ${
          !reverse ? "md:flex-row" : "md:flex-row-reverse"
        } top-10 mx-auto mb-16 max-w-[900px] space-y-4 bg-background md:space-x-8 md:space-y-0 lg:justify-between ${className}`}
      >
        <span className="sr-only">SVG / IMAGE</span>
        <div className="h-[150px] w-full bg-background md:h-[300px] md:min-w-[262px] md:max-w-[485px]">
          {image}
        </div>

        <span className="sr-only">CONTENT</span>
        <div
          className={`text-center ${
            !reverse ? "md:text-left" : "md:text-right"
          } flex w-full flex-col space-y-2 md:max-w-md `}
        >
          <div className="mb-6 space-y-1 md:space-y-4">
            <h2 className="mb-4 text-4xl">{title}:</h2>
            <h3 className="mb-4 text-2xl">{subtitle}</h3>
          </div>
          <div className="max-w-full">
            <p className="text-textSecondary">{description}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
