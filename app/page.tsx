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
          <div className="mx-auto flex w-11/12 flex-col gap-8">
            <Hero />
            {/* <Features />
          <Team /> */}
            {/* <Footer /> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
