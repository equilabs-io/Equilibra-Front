import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { Fragment, use } from "react";
import {
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import PROJECT_LIST_ABI from "@/constants/abis/OwnableList.json";
import TransactionModal from "../TransactionModal";
import { ProjectIdBadge } from "./ProjectIdBadge";

export const CheckoutProjectaCart = ({ ...props }) => {
  const { open, setOpen, projectChekoutInfo, list } = props;

  console.log(list);

  const PROJECT_LENGTH = projectChekoutInfo.length || 0;
  const LIST_NAME = list[0]?.name;

  const projectIds = projectChekoutInfo.map(
    (project: { id: any }) => project.id,
  );

  const { config } = usePrepareContractWrite({
    address: list[0]?.id,
    abi: PROJECT_LIST_ABI,
    functionName: "addProjects",
    args: [projectIds],
    onError: (error) => {
      console.log("error console", error);
    },
  });

  const { write, isLoading, isError, error } = useContractWrite(config);

  const {
    data,
    isError: waitIsError,
    isLoading: isWaitLoading,
    isSuccess,
  } = useWaitForTransaction();

  const handle = () => {
    console.log("closing checkout");
    setOpen(false);
    console.log("writing...");
    write?.();
  };

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
                              <div className="flex flex-col justify-between space-y-1">
                                <span className="line-clamp text-lg">
                                  Your are adding {PROJECT_LENGTH} projects to{" "}
                                </span>
                                <span className="text-2xl">
                                  {LIST_NAME} Management list
                                </span>
                              </div>
                            </div>
                          </div>
                        </section>

                        <div className="absolute bottom-0 left-0 w-full px-4">
                          <TransactionModal
                            isLoading={isLoading}
                            isError={isError}
                            isSuccess={isSuccess}
                            label="Add Projects"
                            writeFunction={handle}
                          />
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

function ProjectCheckOut({ projects }: { projects: any }) {
  return (
    <div>
      <ul role="list" className="grid- mt-0 grid grid-cols-1 gap-8">
        {projects.map((project: any) => (
          <li
            key={project.name}
            className="col-span-1 flex rounded-md bg-surface shadow-sm"
          >
            <ProjectIdBadge id={project.id} size={"lg"} />

            <div className="flex flex-1 items-center justify-between truncate rounded-r-md  bg-surface">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <span className="text-lg">{project.name}</span>
                <p className="text-xs text-gray-500">{project.category}</p>
              </div>
              <div className="flex-shrink-0 pr-2"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
