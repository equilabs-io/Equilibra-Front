import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/services/getProjectsService";
import { getUrqlClient } from "@/services/urqlService";
import { InsideHeader } from "@/components/InsideHeader";

const projectsQuery = `
  query {
    poolProjects {
      flowLastTime
      flowLastRate
      active
      id
    }  
  }
`;
//helper function to get the string after the first dash
function getStringAfterFirstDash(str: string): string {
  const index = str.indexOf("-");
  if (index !== -1) {
    return str.slice(index + 1);
  }
  return "";
}
export default async function Projects() {
  const projectsFlowLastRate = async () => {
    const projectsQueryResult = await getUrqlClient().query(projectsQuery, {});
    const result = projectsQueryResult.data?.poolProjects.map(
      (project: { id: string }) => {
        return {
          ...project,
          id: getStringAfterFirstDash(project.id),
        };
      }
    );
    return result;
  };
  //projects metadata (decr, img, etc)
  const projects = await getProjects();

  //projects details (flowLastRate, flowLastTime, etc)
  const projectsFlowRate = await projectsFlowLastRate();

  // Create a unique array by matching id from projects metadata and flowLastRate details
  const PROJECTS = projects.map((metadataItem) => {
    const correspondingDetails = projectsFlowRate.filter(
      (detail: { id: string }) => detail.id === metadataItem?.id
    );
    const flowLastRates = correspondingDetails.map(
      (detail: { flowLastRate: any }) => detail.flowLastRate
    );
    const flowLastTime = correspondingDetails.map(
      (detail: { flowLastTime: any }) => detail.flowLastTime
    );

    return {
      ...metadataItem,
      flowLastRates: flowLastRates.length > 0 ? flowLastRates : [0],
      flowLastTime: flowLastTime.length > 0 ? flowLastTime : [0],
      active: correspondingDetails[0]?.active || false,
    };
  });

  return (
    <>
      <InsideHeader
        title="The Next Web3 Giants"
        description=" Bring your community to the next level by supporting your favorite proyects"
      />
      <div className="w-full flex flex-col justify-center items-center gap-8 xl:gap-16 rounded-lg px-6 mt-44">
        <div className="w-full max-w-[1440px] pb-8">
          <h2 className="sr-only">projects</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-6 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
            {PROJECTS?.map((project, id) => {
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
