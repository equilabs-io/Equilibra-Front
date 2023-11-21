import React from "react";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getProjects } from "@/services/getProjectsService";
import { getUrqlClient } from "@/services/urqlService";

const projectsQuery = `
  query {
      poolProjectSupports {
        poolProject {
          id
          flowLastRate
        }
      }   
  }
`;

export default async function Projects() {
  const getAllProjectsFlowLastRate = async () => {
    const projectsQueryResult = await getUrqlClient().query(projectsQuery, {});
    return projectsQueryResult.data;
  };
  function getStringAfterFirstDash(str: string): string {
    const index = str.indexOf("-");
    if (index !== -1) {
      return str.slice(index + 1);
    }
    return "";
  }
  const projects = await getProjects();

  const allProjectsFlowRate = await getAllProjectsFlowLastRate();

  const addFlowLastRateToProjects = (projects: Project[]) => {
    return projects.map((project) => {
      const id = project.id;
      const flowLastRate = allProjectsFlowRate.poolProjectSupports.find(
        (support) => support.poolProject.id === id
      )?.poolProject.flowLastRate;
      return {
        ...project,
        flowRate: flowLastRate || 0,
      };
    });
  };

  const id = projects[0].id;
  const compare = getStringAfterFirstDash(
    allProjectsFlowRate.poolProjectSupports[0].poolProject.id
  );
  console.log(id, compare);
  const projectsWithFlowRate = addFlowLastRateToProjects(projects);
  console.log(projectsWithFlowRate);

  return (
    <>
      <Example />
      <div className="w-full flex flex-col justify-center items-center gap-8 xl:gap-16 rounded-lg px-6 mt-44">
        <div className="w-full max-w-[1440px] pb-8">
          <h2 className="sr-only">projects</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-6 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
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

const Example = () => {
  return (
    <>
      <div className="w-full">
        <div className="container m-auto px-6 pt-32 pb-32 md:px-12 lg:pt-[4.8rem] lg:pb-[4.8rem] lg:px-7">
          <div className="flex items-center flex-wrap px-2 md:px-0">
            <div className="relative lg:w-8/12 lg:py-24 xl:py-32 space-y-8">
              <h1 className="font-bold md:text-7xl lg:w-10/12 text-[#d7fded]">
                The Next Web3 Giants
              </h1>
              <p className="text-textSecondary text-lg">
                Bring your community to the next level by supporting your
                favorite proyects
              </p>
            </div>
            <div className="flex justify-center md:w-full lg:w-1/3 mt-10 lg:mt-0">
              <Link href="./create-project">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-xl font-semibold text-black shadow-sm hover:bg-primary_var "
                >
                  <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Create New Project
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className=" w-full h-10 rounded-full flex items-center justify-center border border-highlight">
          Search
        </div>
      </div>
    </>
  );
};
