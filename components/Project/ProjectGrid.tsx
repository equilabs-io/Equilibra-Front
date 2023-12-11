"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
type ProjectGridProps = {
  children: React.FC;
  projects: [];
};
//helper function to get the string after the first dash -
function getFirstLetterAfterHyphen(str: string): string {
  const hyphenIndex = str.indexOf("-");
  if (hyphenIndex !== -1 && hyphenIndex < str.length - 1) {
    return str.charAt(hyphenIndex + 1);
  }
  return "";
}

const ProjectGrid = ({ children, projects }: ProjectGridProps) => {
  const [arrayOfIds, setArrayofIds] = useState([]);

  //function that
  const addIdToArray = (newId: any) => {
    //collect the id
    const id = getFirstLetterAfterHyphen(newId);
    // Convert the new ID to a number
    const numericId = Number(id);

    // Check if the numeric ID is not NaN and not already in the array
    if (!isNaN(numericId) && !arrayOfIds.includes(numericId)) {
      setArrayofIds((prevIds) => [...prevIds, numericId]);
    } else {
      alert(`Invalid or duplicate ID: ${numericId}`);
    }
  };

  console.log(arrayOfIds);

  return (
    <div className="relative mt-44 flex w-full flex-col items-center justify-center gap-8 rounded-lg border-2 px-6 xl:gap-16">
      <div className="relative w-full max-w-[1440px] pb-8">
        <button className="sticky right-0 top-[120px] z-50 h-fit  border bg-surface py-2">
          cart {arrayOfIds.length}
        </button>
        <h2 className="sr-only">projects</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-6 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
          {projects?.map((project, idx) => {
            if (project)
              return (
                <div key={idx}>
                  <ProjectCard project={project} addIdToArray={addIdToArray} />
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;
