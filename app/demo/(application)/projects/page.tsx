import React from "react";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getProjects } from "@/services/getProjectsService";

export default async function Projects() {
  const projects = await getProjects();

  // Function to add a { key: "random" } property to each project
  const addKeyToProjects = () => {
    return projects.map((project) => {
      return { ...project, key: "random" };
    });
  };

  const projectsWithKey = addKeyToProjects();

  // Rest of the code
  console.log(projectsWithKey);
  return (
    <>
      <Example />
      <div className="w-full flex flex-col justify-center items-center gap-8 xl:gap-16 rounded-lg px-6 mt-44">
        <div className="w-full max-w-[1440px] pb-8">
          <h2 className="sr-only">projects</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-6 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
            {projectsWithKey?.map((project, id) => {
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

const Example = () => {
  return (
    <>
      <div className="w-full bg-yellow-50 dark:bg-[#121312]">
        <div className=" h-fit flex justify-end">
          <Link href="./create-project">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-xl font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Create New Project
            </button>
          </Link>
        </div>
        <div className="container m-auto px-6 pt-32 pb-32 md:px-12 lg:pt-[4.8rem] lg:pb-[4.8rem] lg:px-7">
          <div className="flex items-center flex-wrap px-2 md:px-0">
            <div className="relative lg:w-8/12 lg:py-24 xl:py-32 ">
              <h1 className="font-bold text-4xl text-yellow-900 dark:text-yellow-50 md:text-5xl lg:w-10/12">
                The Next Web3 Giants
              </h1>
              <p>
                Bring your community to the next level by supporting your
                favorite proyects
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full h-10 rounded-full flex items-center justify-center">
          Search
        </div>
      </div>
    </>
  );
};
