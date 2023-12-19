import React from "react";
import { InsideHeader } from "@/components/InsideHeader";
import ProjectCard from "@/components/Project/ProjectCard";
import Search from "@/components/Search";
import { getProjects } from "@/services/getProjectsService";
import { getUrqlClient } from "@/services/urqlService";
import ProjectGrid from "@/components/Project/ProjectsGrid";

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
export default async function Projects({}) {
  const projectsFlowLastRate = async () => {
    const projectsQueryResult = await getUrqlClient().query(projectsQuery, {});
    const result = projectsQueryResult.data?.poolProjects.map(
      (project: { id: string }) => {
        return {
          ...project,
          id: getStringAfterFirstDash(project.id),
        };
      },
    );
    return result;
  };
  //projects metadata (name, img ... etc)
  const projects = await getProjects();

  //projects details (flowLastRate, flowLastTime, etc)
  const projectsFlowRate = await projectsFlowLastRate();

  // Create a unique array by matching data from projects metadata and flowLastRate details by id
  const PROJECTS = projects.map((metadataItem) => {
    const correspondingDetails = projectsFlowRate.filter(
      (detail: { id: string }) => detail.id === metadataItem?.id,
    );
    const flowLastRates = correspondingDetails.map(
      (detail: { flowLastRate: any }) => detail.flowLastRate,
    );
    const flowLastTime = correspondingDetails.map(
      (detail: { flowLastTime: any }) => detail.flowLastTime,
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
        description="Shape the destiny of your organization and the Web3 landscape. The journey begins with creating a meaningful project."
        href="./create-project"
      />
      {/* search - filter - cart  */}

      {/* <Search search={search} /> */}

      {/* projects ... */}

      <ProjectGrid projects={PROJECTS} />
    </>
  );
}
