import React from "react";
import { getProjects } from "@/services/getProjectsService";
import WorkInProgress from "@/components/WorkInProgress";
import { SupportCard } from "@/components/SupportCard";
import { slice } from "viem";

export default async function Contribute() {
  const projects = await getProjects();

  // const projectsSlice = slice(projects, 0, 3);

  return (
    <>
      <WorkInProgress />
      {/* <div className="w-full flex flex-col justify-center items-center gap-8 xl:gap-16 rounded-lg px-6">
        <div className="w-full max-w-[1440px] pb-8">
          <h2 className="mb-4">Pool 1</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-6 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] ">
            {projects?.map((project, id) => {
              if (project)
                return (
                  <div key={id}>
                    <h2>
                      <SupportCard project={project} />
                    </h2>
                  </div>
                );
            })}
          </div>
        </div>
      </div> */}
    </>
  );
}
