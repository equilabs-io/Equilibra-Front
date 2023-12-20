"use client";
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { SelectedList } from "./SelectedList";
import { CheckoutProjectaCart } from "./CheckoutProjectsCart";
import { getStringAfterFirstDash } from "@/lib/format";

type ProjectGridProps = {
  children?: React.FC;
  projects: Project[];
};

type Project =
  | {
      flowLastRates: any;
      flowLastTime: any;
      active: any;
      content: any;
      contentHash: any;
      admin: string;
      beneficiary: string;
      id: string;
      projectLists: any;
      __typename: string;
    }
  | undefined;

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const [projectsCheckoutInfo, setprojectsCheckoutInfo] = useState<
    { id: number; name?: string; catogory?: string }[]
  >([]);
  const [openCart, setOpenCart] = useState(false);
  const [lists, setLists] = useState([]);

  const projectInCart = projectsCheckoutInfo.length;

  const hanldeOpenCart = () => {
    setOpenCart(true);
  };

  //function that adds the neccesary data to the array of ids
  const createProjectsCheckoutInfo = (newId: string) => {
    const id = getStringAfterFirstDash(newId);
    const numericId = Number(id);

    if (
      !isNaN(numericId) &&
      !projectsCheckoutInfo.some((item) => item.id === numericId)
    ) {
      projects.forEach((project: Project) => {
        if (
          project !== undefined &&
          project.id &&
          getStringAfterFirstDash(project.id) === String(numericId)
        ) {
          setprojectsCheckoutInfo((prevIds) => [
            {
              id: numericId,
              name: project.content?.name || `${project.id}}`,
              category: project.content?.category || "not specified",
            },
            ...prevIds,
          ]);
        }
      });
    } else {
      alert(`Invalid or duplicate ID: ${numericId}`);
    }
  };

  return (
    <>
      <div className="relative mt-10 flex w-full flex-col items-center justify-center gap-8 rounded-lg  px-6 xl:gap-16">
        <div className="w-full max-w-[1440px] pb-8">
          <SelectedList
            lists={lists}
            setLists={setLists}
            onClick={hanldeOpenCart}
            amount={projectInCart}
            disabled={projectInCart < 2 || lists.length === 0}
          />

          <h2 className="sr-only">projects</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-6 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
            {projects?.map((project, idx) => {
              if (project !== undefined && project.id)
                return (
                  <div key={idx}>
                    <ProjectCard
                      project={project}
                      projectCheckout={createProjectsCheckoutInfo}
                    />
                  </div>
                );
            })}
          </div>
        </div>
      </div>
      <CheckoutProjectaCart
        list={lists}
        open={openCart}
        setOpen={setOpenCart}
        projectChekoutInfo={projectsCheckoutInfo}
      />
    </>
  );
};

export default ProjectGrid;
