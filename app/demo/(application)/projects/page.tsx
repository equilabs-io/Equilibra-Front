import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/services/getProjectsService";

export default async function Projects() {
  const projects = await getProjects();
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-8 xl:gap-16 rounded-lg px-6">
        <div className="w-full max-w-[1440px] pb-8">
          <h2 className="sr-only">projects</h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-6 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] border-2">
            {projects?.map((project, id) => {
              if (project)
                return (
                  <div key={id}>
                    <ProjectCard project={project} />
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
