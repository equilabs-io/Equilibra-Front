"use client";
import { NextPage } from "next";
import { motion } from "framer-motion";
import { Hero } from "@/components/LandingLayout";
import { Features } from "@/components/LandingLayout";
import { Team } from "@/components/LandingLayout";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="container mx-auto">
          <div className="mx-auto flex w-11/12 flex-col">
            <Hero />
            <motion.div
              initial={{ opacity: 0.5, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              viewport={{ once: false }}
              className="flex flex-col items-center min-h-[60vh]"
            >
              <span className="sr-only">Welcome Title & content</span>
              <h2 className="mb-6 text-center">The Future of CrowFunding</h2>
              <div className="max-w-[987px] text-center px-4 md:px-0 min-h-max">
                <p className="leading-8 font-thin">
                  Welcome to our Web3 crowdfunding platform! We're here to
                  change how projects get funded. Whether you're a DAO or an
                  organization, we offer tailored solutions for decentralized
                  communities. Be a part of the crowdfunding revolution, shaping
                  a better tomorrow, many projects at a time."
                </p>
              </div>
            </motion.div>
            {/* <Features /> */}
            {/* <Team />  */}
            {/* <Footer /> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
