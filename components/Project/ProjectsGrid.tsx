"use client";
import React, { useState, Fragment } from "react";
import ProjectCard from "./ProjectCard";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
            className="absolute -right-6 -top-10 z-20 h-fit rounded-full  bg-surface p-2"
          >
            cart {projectsCheckoutInfo.length}
          </button>

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
      <CheckoutCart
        open={openCart}
        setOpen={setOpenCart}
        projectChekoutInfo={projectsCheckoutInfo}
      />
    </>
  );
};

export default ProjectGrid;

const CheckoutCart = ({ ...props }) => {
  const { open, setOpen, projectChekoutInfo } = props;
  const [openModal, setOpenModal] = useState(false);
  const handle = () => {
    setOpen(false);
    setOpenModal(true);
  };

  const PROJECT_LENGTH = projectChekoutInfo.length || 0;
  const LIST_NAME = "List Peepo";

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300 sm:duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300 sm:duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md ">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-surface py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base leading-6">
                          Projects List Details
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 text-white sm:px-6">
                        <section
                          aria-labelledby="summary-heading"
                          className="px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
                        >
                          <div className="mx-auto max-w-lg space-y-10 text-textSecondary lg:max-w-none">
                            <ProjectCheckOut projects={projectChekoutInfo} />

                            <div className="flex h-[150px] flex-col justify-evenly pl-4">
                              <p>Resume</p>
                              <div className="flex flex-col justify-between space-y-3">
                                <span className="line-clamp- text-xl">
                                  Your are adding {PROJECT_LENGTH} projects to:{" "}
                                </span>
                                <span className="text-xl ">{LIST_NAME}</span>
                              </div>
                            </div>
                          </div>
                        </section>
                        <button
                          className="w-full bg-highlight text-2xl font-bold text-white hover:bg-primary hover:text-highlight"
                          onClick={handle}
                        >
                          ADD PROJECTS
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* <TransactionModal open={openModal} setOpen={setOpenModal} /> */}
    </>
  );
};

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

function ProjectCheckOut({ projects }: { projects: any }) {
  return (
    <div>
      <ul role="list" className="grid- mt-0 grid grid-cols-1 gap-8">
        {projects.map((project: any) => (
          <li
            key={project.name}
            className="col-span-1 flex rounded-md bg-surface shadow-sm"
          >
            <div
              className={
                "relative flex w-16 flex-shrink-0 items-center justify-center rounded-l-md bg-primary text-lg font-medium text-highlight"
              }
            >
              <span className="absolute left-1 top-1 text-xs">id:</span>
              {project.id}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md  bg-surface">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <span className="text-lg">{project.name}</span>
                <p className="text-sm text-gray-500">{project.category}</p>
              </div>
              <div className="flex-shrink-0 pr-2"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
