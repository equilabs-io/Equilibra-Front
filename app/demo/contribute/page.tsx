import React from "react";
import { getProjects } from "@/services/getProjectsService";
import WorkInProgress from "@/components/WorkInProgress";

export default async function Contribute() {
  const projects = await getProjects();
  return (
    <>
      <WorkInProgress />
    </>
  );
}
