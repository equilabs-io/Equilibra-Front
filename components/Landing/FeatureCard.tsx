import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useScroll, useTransform, motion } from "framer-motion";

type FeatureCardProps = {
  title: string;
  description: string;
  image: React.ReactNode;
  isComingSoon: boolean;
};

export default function FeatureCard({
  title,
  description,
  image,
  isComingSoon,
}: FeatureCardProps) {
  return (
    <div className={`relative ${!isComingSoon && `hover:z-20`}`}>
      {isComingSoon && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-md font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          Coming Soon
        </span>
      )}
      <motion.div
        className={`min-w-[320px] min-h-[280px] overflow-hidden rounded-md bg-surface bg-gradient-to-b from-[#103029] from-14% to-surface to-86% lg:rotate-[-4deg] group ${
          !isComingSoon
            ? `hover:rotate-0 hover:scale-125 hover:z-10`
            : `grayscale-[0.8] filter blur-[1px]`
        } transition-all duration-[400ms] ease-in-out`}
      >
        <div className="relative h-full flex flex-col justify-between">
          {!isComingSoon && (
            <div
              className={`flex z-5 items-center justify-center absolute w-10 h-10 top-0 right-0 bg-primary_var rounded-bl-full transition-all duration-[400ms] ease-in-out ${
                !isComingSoon && `group-hover:transform group-hover:scale-[50]`
              } bg-gradient-to-b from-primary from-2% to-surface to-98%`}
            ></div>
          )}
          <div className="px-6 py-4 z-10">
            <h3
              className={`h-[80px] text-3xl text-primary mb-8 text-center mt-3 ${
                !isComingSoon && `group-hover:text-white`
              }`}
            >
              {title}
            </h3>
            <div className="top-28 w-full">
              <p
                className={`text-textSecondary text-center ${
                  !isComingSoon && `group-hover:text-white`
                }`}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
        {/* Link go doc */}
      </motion.div>
    </div>
  );
}
