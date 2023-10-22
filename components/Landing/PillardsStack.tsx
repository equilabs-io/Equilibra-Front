import { useScroll, useTransform, motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { WavesSvg } from "@/assets/WavesSvg";
import { PowerSvg } from "@/assets/PowerSvg";
import { BricksSvg } from "@/assets/BricksSvg";

type cardProps = {
  title: string;
  subtitle: string;
  description: string;
  image: ReactNode;
  className?: string;
  reverse?: boolean;
};

export const PillardsStack = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const fadeIn = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scaleIn = useTransform(scrollYProgress, [0.1, 0.3], [0.5, 1]);

  const fontSize = "text-xl md:text-4xl lg:text-5xl";

  const PillardCard = ({
    title,
    subtitle,
    description,
    image,
    className,
    reverse = false,
  }: cardProps) => {
    return (
      <>
        <motion.div
          style={{ opacity: fadeIn, scale: scaleIn }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`flex flex-col ${
            !reverse ? "md:flex-row" : "md:flex-row-reverse"
          } max-w-[900px] mx-auto sticky top-10 bg-background md:space-x-8 lg:justify-between space-y-4 md:space-y-0 mb-24 ${className}`}
        >
          <span className="sr-only">SVG / IMAGE</span>
          <div className="h-[150px] w-full md:h-[300px] md:min-w-[262px] md:max-w-[485px] bg-background">
            {image}
          </div>

          <span className="sr-only">CONTENT</span>
          <div
            className={`text-center ${
              !reverse ? "md:text-left" : "md:text-right"
            } flex flex-col w-full md:max-w-md justify-between space-y-2 `}
          >
            <div className="space-y-1 md:space-y-4 ">
              <h2 className={fontSize}>{title}:</h2>
              <h3 className={`${fontSize} md:max-w-full`}>{subtitle}</h3>
            </div>
            <div className="max-w-full">
              <p className="text-textSecondary">{description}</p>
            </div>
          </div>
        </motion.div>
      </>
    );
  };

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

  return (
    <>
      <motion.section ref={targetRef} className="min-h-[180vh] mt-[200px]">
        {pillardsInfo.map((pillard, index) => (
          <PillardCard key={index} {...pillard} />
        ))}
      </motion.section>
    </>
  );
};
