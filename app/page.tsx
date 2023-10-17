"use client";
import { NextPage } from "next";
import { motion } from "framer-motion";
import WavesSvg from "@/assets/WavesSvg";
import { Hero } from "@/components/Landing";
import { Features } from "@/components/Landing";
import { Team } from "@/components/Landing";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="container mx-auto">
          <div className="mx-auto flex w-11/12 flex-col relative">
            <Hero />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              viewport={{ once: false }}
              className="flex flex-col items-center"
            >
              <span className="sr-only">Welcome Title & content</span>
              <h2 className="mb-4 text-center">
                The Future of CrowFunding in{" "}
                <span className="text-primary text-5xl">3</span> Pillards
              </h2>
              <div className="max-w-[987px] text-center px-4 md:px-0 min-h-max">
                <p className="leading-8 font-thin">
                  We're here to change how projects get funded. Whether you're a
                  DAO or an organization, we offer tailored solutions for
                  decentralized communities. Be a part of the crowdfunding
                  revolution, shaping a better tomorrow, many projects at a
                  time."
                </p>
              </div>
            </motion.div>
            <Features />
            {/* <Team />  */}
            {/* <Footer /> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
