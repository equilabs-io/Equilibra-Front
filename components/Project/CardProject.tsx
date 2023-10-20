import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useTime } from "framer-motion";
import React from "react";

type CardProjectProps = {
  name: string;
  link: string;
  category: string;
  image: string;
  description: string;
};

export const CardProject = ({
  name = "Equilabs",
  link,
  category = "DAO tooling",
  image,
  description,
}: CardProjectProps) => {
  const [visible, setVisible] = useState(true);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.1, 0.6, 1]);
  const time = useTime();

  //   testing
  const rotate = useTransform(
    time,
    [0, 4000], // For every 4 seconds...
    [0, 360], // ...rotate 360deg
    { clamp: false }
  );
  return (
    <>
      {/* test */}
      <div className="max-w-md mx-auto sticky top-20">
        <div className="relative group">
          {/* Blur gradient effect div */}
          <motion.div
            style={{ opacity }}
            className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-600 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-300 group-hover:duration-200"
          />
          <div className="relative px-2 py-0 bg-background ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
            <div className="w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words  shadow-2xl bg-secondary md:max-w-sm rounded-xl">
              <div className="flex flex-wrap justify-center ">
                <div className="flex justify-center w-full">
                  {/* Image Section  */}
                  <div className="relative mb-4">
                    <motion.div
                      style={{ rotate }}
                      className="border-white border-gray-800 rounded-full align-middle border-8 absolute -m-16  min-w-[150px] min-h-[150px]"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 lg:mt-20 text-center ">
                <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                  {name}
                </h3>
                <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                  Ox547bb .... 33bF
                </h3>
                <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                  {category}
                </h3>
                <h3 className="mb-1 text-xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                  https://github.com/equilabs-io
                </h3>
              </div>
              <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-6">
                    <p className="mb-4 font-light text-justify leading-relaxed text-gray-600 dark:text-gray-400">
                      {description}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Proin turpis orci, maximus sed purus a, cursus scelerisque
                      purus. Morbi molestie, odio at sagittis rhoncus, felis
                      massa iaculis mi, quis molestie erat ipsum vel risus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
