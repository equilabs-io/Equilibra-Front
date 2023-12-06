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
    [0.4, 1, 1, 0.4]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.4, 1, 1, 0.4]
  );
  return (
    <>
      <motion.div
        transition={{ duration: 0.5, ease: "easeInOut" }}
        ref={ref}
        style={{ opacity, scale }}
        className={`flex flex-col ${
          !reverse ? "md:flex-row" : "md:flex-row-reverse"
        } max-w-[900px] mx-auto top-10 bg-background md:space-x-8 lg:justify-between space-y-4 md:space-y-0 mb-16 ${className}`}
      >
        <span className="sr-only">SVG / IMAGE</span>
        <div className="h-[150px] w-full md:h-[300px] md:min-w-[262px] md:max-w-[485px] bg-background">
          {image}
        </div>

        <span className="sr-only">CONTENT</span>
        <div
          className={`text-center ${
            !reverse ? "md:text-left" : "md:text-right"
          } flex flex-col w-full md:max-w-md space-y-2 `}
        >
          <div className="space-y-1 md:space-y-4 mb-6">
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
