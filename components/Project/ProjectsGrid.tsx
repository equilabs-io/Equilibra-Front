"use client";
import React, { useState, Fragment } from "react";
import ProjectCard from "./ProjectCard";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SelectedList } from "./SelectedList";
import TransactionModal from "../TransactionModal";
import { CheckoutProjectaCart } from "./CheckoutProjectsCart";

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
      __typename: string;
    }
  | undefined;

//helper function to get the string after the first dash -
function getFirstLetterAfterHyphen(str: string): string {
  const hyphenIndex = str.indexOf("-");
  if (hyphenIndex !== -1 && hyphenIndex < str.length - 1) {
    return str.charAt(hyphenIndex + 1);
  }
  return "";
}

const ProjectGrid = ({ children, projects }: ProjectGridProps) => {
  const [projectsCheckoutInfo, setprojectsCheckoutInfo] = useState<
    { id: number; name?: string; catogory?: string }[]
  >([]);
  const [openCart, setOpenCart] = useState(false);
  const [lists, setLists] = useState([]);

  //function that adds the neccesary data to the array of ids
  const createProjectsCheckoutInfo = (newId: string) => {
    const id = getFirstLetterAfterHyphen(newId);
    const numericId = Number(id);

    if (
      !isNaN(numericId) &&
      !projectsCheckoutInfo.some((item) => item.id === numericId)
    ) {
      projects.forEach((project: Project) => {
        if (
          project !== undefined &&
          project.id &&
          getFirstLetterAfterHyphen(project.id) === String(numericId)
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
      <div className="relative mt-44 flex w-full flex-col items-center justify-center gap-8 rounded-lg  px-6 xl:gap-16">
        <div className=" w-full max-w-[1440px]  pb-8">
          <button
            onClick={() => setOpenCart(true)}
            disabled={projectsCheckoutInfo.length < 2 || lists.length === 0}
            className="absolute -right-[-40px] -top-[80px] z-20 h-fit rounded-full bg-surface p-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            cart {projectsCheckoutInfo.length}
          </button>
          <SelectedList lists={lists} setLists={setLists} />

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
