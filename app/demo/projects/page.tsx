import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { getUrqlClient } from "@/services/urqlService";
import { ethers } from "ethers";


const projectsQuery = `
  query {
    projects(first: 10) {
        admin
        id
        beneficiary
        contentHash
    }
  }
`;
interface Project {
  admin: string;
  beneficiary: string;
  contentHash: string;
  id: string;
  __typename: string;
}

interface ProjectQuery {
  projects: Project[];
}

const getIpfsData = async (hash: string) => {
  try {
    const res = await fetch(`${process.env.PINATA_GATEWAY_URL}${hash}`);
    if (res.ok) return await res.json();
    else return undefined;
  } catch (error) {
    console.log(error);
  }
};

const getParsedProjects = async (projectsQuery: ProjectQuery) => {
  const abiCoder = new ethers.utils.AbiCoder();

  const projects = projectsQuery?.projects.map((project) => {
    try {
      return {
        ...project,
        contentHash: abiCoder.decode(["string"], project.contentHash)[0],
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });

  // not working at the moment
  projects.filter(Boolean); // filter by truthy values using Boolean constructor

  const parsedProjects = await Promise.all(
    projects.map(async (project) => {
      if (project) {
        try {
          return {
            ...project,
            content: await getIpfsData(project.contentHash),
          };
        } catch (error) {
          console.log(error);
        }
      }
    })
  );
  return parsedProjects;
};

export default async function Projects() {
  const projectsQueryResult = await getUrqlClient().query(projectsQuery, {});

  const projects = await getParsedProjects(projectsQueryResult.data);

  return (
    // <div className=" rounded-lg bg-surface shadow">
    // <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    //   <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">

    <div className="w-full flex flex-col justify-center items-center gap-8 xl:gap-16 rounded-lg">
      <div className="w-full max-w-[1440px] pb-8">
        <h2 className="sr-only">projects</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-6 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
          {projects?.map((project, id) => {
            if (project)
              return (
                <div
                  key={id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <ProjectCard project={project} />
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
