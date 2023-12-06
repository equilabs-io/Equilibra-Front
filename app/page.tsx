"use client";
import { NextPage } from "next";
import { Hero } from "@/components/Landing";
import { PillarsStack } from "@/components/Landing";
import Features from "@/components/Landing/Features";
import { Team } from "@/components/Landing";
import { Footer } from "@/components/Footer";
import { GridPattern } from "@/components/Landing/GridPattern";
import Pillars from "@/components/Landing/Pillars";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col relative">
        <main className="container mx-auto">
          <GridPattern
            className="absolute inset-x-0 -top-14  w-full h-[800px] fill-primary stroke-slate-800 [mask-image:linear-gradient(to_bottom_right,white_30%,transparent_50%)]"
            yOffset={10}
            interactive
          />
          <div className="flex mx-4 lg:mx-14 flex-col relative gap-8 lg:gap-16">
            <Hero />
            <Pillars />
            <PillarsStack />
            <Features />
            <Team />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
