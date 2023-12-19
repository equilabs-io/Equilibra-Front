"use client";
import { motion } from "framer-motion";
type StatProps = {
  name: string;
  data: string;
  unit?: string;
};
const variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
  hidden: { opacity: 0.2 },
};
export default function ManagerStats({ poolStats }: { poolStats: any }) {
  console.log(poolStats);
  return (
    <div className="w-full bg-background">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {!poolStats.length
            ? Array.from({ length: 4 }).map((_, i) => <LoadingStats key={i} />)
            : poolStats?.map((stat: StatProps, i: number) => (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  custom={i}
                  key={stat.name}
                  className="group rounded-lg  bg-surface px-1 py-2 shadow transition-all duration-300 ease-in sm:px-6 lg:px-8"
                >
                  <p className="text-xs font-medium leading-6 text-textSecondary">
                    {stat.name}
                  </p>
                  <p className="mt-2 flex items-baseline gap-x-2">
                    <span className="text-xl font-semibold tracking-tight text-white">
                      {stat.data}
                    </span>
                  </p>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
}

function LoadingStats() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-md  p-4 shadow">
      <div className="flex animate-pulse space-x-4">
        <div className="h-10 w-10 rounded-full bg-slate-700"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-slate-700"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 h-3 rounded-full bg-slate-700"></div>
            </div>
            {/* <div className="h-2 rounded bg-slate-700"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
