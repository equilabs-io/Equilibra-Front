// import React from "react";

// import { useScroll, useTransform, motion } from "framer-motion";
// import { useRef } from "react";




// const HorizontalScrollAnimate = () => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//   });

//   const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);
//   const fadeOut = useTransform(scrollYProgress, [0, 1], [1, 0]);
//   const color = useTransform(
//     scrollYProgress,
//     [0, 1],
//     ["", "var(--color-primary)"]
//   );

//   return (
//     <section ref={targetRef} className="relative h-[300vh]">
//       <motion.h2
//         style={{ opacity: fadeOut, color }}
//         transition={{ duration: 0.8 }}
//         className="text-center text-5xl sticky top-20 transition-all ease-in-out duration-500"
//       >
//         Unleash the Power of Our Features
//       </motion.h2>
//       <div className="sticky top-0 flex h-screen items-center overflow-hidden space-y-4">
//         <motion.div style={{ x }} className="flex gap-8">
//           {featuresInfo.map((card) => {
//             return <FeaturesCard key={card.title} {...card} />;
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export const HorizontalFeatures: React.FC = () => {
//   return (
//     <>
//       <HorizontalScrollAnimate />
//     </>
//   );
// };
