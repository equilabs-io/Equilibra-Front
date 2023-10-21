import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";

interface Project {
  id: string;
  admin: string;
  beneficiary: string;
  contentHash: string;
  content: any;
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
  const { id, admin, beneficiary, contentHash, content } = project;

  const { description, link, fileHash, name, category } = content;

  return (
    <section className="group relative flex flex-col overflow-hidden rounded-lg  bg-surface">
      <div className="aspect-h-4 aspect-w-3 bg-white sm:aspect-none group-hover:opacity-75 sm:h-96">
        {content?.fileHash && (
          <Image
            src={`${process.env.PINATA_GATEWAY_URL}${fileHash}`}
            alt="project img"
            height={400}
            width={300}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 bg-surface">
        <h3 className="truncate mb-5">{name ? name : "-no name-"}</h3>

        {/* <a href={link && link}>
          <span aria-hidden="true" className="absolute inset-0" />
          Link
        </a> */}
        {/* <div className="max-h-5 "> */}
          <p className="mb-3 truncate">{description}</p>
        {/* </div> */}

        {category && (
          <div className="flex flex-1 flex-col justify-end">
            <p className="mb-3">{category}</p>
            {/* <p className="text-base font-medium text-gray-900">{price}</p> */}
          </div>
        )}
        <div className="border-t border-grey_mlight my-2"></div>
        <div className="flex justify-center my-4">
          <CustomButton text="Contribute" styles="w-full" />
        </div>
      </div>
    </section>
  );
}
