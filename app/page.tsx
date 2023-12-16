import { NextPage } from "next";
import { Hero } from "@/components/Landing/";
import { PillarsStack } from "@/components/Landing";
import Features from "@/components/Landing/Features";
import { Team } from "@/components/Landing";
import { Footer } from "@/components/Footer";
import { GridPattern } from "@/components/Landing/GridPattern";
import Pillars from "@/components/Landing/Pillars";

const Home: NextPage = () => {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <main className="container mx-auto">
          <GridPattern
            className="absolute inset-x-0 -top-14  h-[800px] w-full fill-primary stroke-slate-800 [mask-image:linear-gradient(to_bottom_right,white_30%,transparent_50%)]"
            yOffset={10}
            interactive
          />
          <div className="relative mx-4 flex flex-col gap-8 lg:mx-14 lg:gap-16">
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
