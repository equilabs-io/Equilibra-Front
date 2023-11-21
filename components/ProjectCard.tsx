import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";

interface Project {
  id: string;
  admin: string;
  beneficiary: string;
  contentHash: string;
  content: any;
  flowLastRates: number[];
  flowLastTime: number[];
  active: boolean;
  __typename: string;
}

interface Content {
  description: string;
  link: string;
  fileHash: string;
  name: string;
  category: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const {
    id,
    admin,
    beneficiary,
    contentHash,
    content,
    flowLastRates,
    flowLastTime,
    active,
  } = project;

  const { description, link, fileHash, name, category } = content;

  //helper function to get the string after the first dash -
  function getFirstLetterAfterHyphen(str: string): string {
    const hyphenIndex = str.indexOf("-");
    if (hyphenIndex !== -1 && hyphenIndex < str.length - 1) {
      return str.charAt(hyphenIndex + 1);
    }
    return "";
  }

  return (
    <section className="group relative flex flex-col p-2 overflow-hidden rounded-lg bg-surface hover:shadow-md hover:shadow-highlight  opacity-75">
      <div className="bg-white sm:aspect-none group-hover:opacity-100 h-[180px] ">
        {category && (
          <div className="flex flex-1 flex-col justify-end m-2 absolute top-2 left-2">
            {/* <span className="opacity-80  inline-flex items-center rounded-full bg-primary px-4 py-2 text-2xl font-medium text-black transition-opacity duration-200 ease-in">
              {getFirstLetterAfterHyphen(id)}
            </span> */}
          </div>
        )}
        {(content?.fileHash && (
          <Image
            src={`${process.env.PINATA_GATEWAY_URL}${fileHash}`}
            alt="project img"
            height={400}
            width={300}
            className="h-full w-full object-cover object-center"
          />
        )) ||
          ""}
      </div>
      <div className="flex flex-1 flex-col p-4 bg-surface -mt-[50px] group-hover:mt-0 transition-all duration-200 ease-out">
        <h3 className="truncate mb-1">{name ? name : "-no name-"}</h3>
        <p className="mb-0 line-clamp-3 text-textSecondary font-thin min-h-[75px]">
          {description}
        </p>
      </div>
      {/* Project Details */}
      <div className="flex flex-1 flex-col p-4 bg-surface gap-2">
        <div className="flex justify-between items-center">
          <h4 className="truncate mb-1 text-textSecondary">Project Details</h4>
          <span
            className={`max-w-fit inline-flex items-center gap-x-1.5 rounded-md px-4 py-0.5 text-sm font-medium  ${
              active
                ? "text-primary_var bg-surface_var"
                : "text-red-300 bg-highlight"
            }`}
          >
            <svg
              className={`h-1.5 w-1.5  ${
                active
                  ? "text-primary_var fill-primary_var"
                  : "text-highlight fill-red-500"
              }`}
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            {active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="bg-highlight p-2 flex justify-between items-center">
          <span className="font-bold text-textSecondary">Streaming:</span>{" "}
          <span className="text-xl font-mono">{flowLastRates}</span>
        </div>

        <div className="bg-highlight p-2 flex justify-between items-center">
          <span className="font-bold text-textSecondary">Amount streamed:</span>{" "}
          <span className="text-xl font-mono">0</span>
        </div>

        <div className="my-2"></div>
        <div className="flex justify-center">
          <CustomButton
            text="Support Project"
            styles={`w-full  ${
              active ? "" : "bg-red-200 text-highlight hover:bg-red-300"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
