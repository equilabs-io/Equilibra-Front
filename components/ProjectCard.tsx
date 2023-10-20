import React from "react";
import Image from "next/image";

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

export default async function ProjectCard({ project }: { project: Project }) {
  const { id, admin, beneficiary, contentHash, content } = project;

  // const { description, link, fileHash, name, category } = content;

  return (
    <>
      <div className="aspect-h-4 aspect-w-3 bg-surfaces sm:aspect-none group-hover:opacity-75 sm:h-96">
        {content?.fileHash && (
          <Image
            src={`${process.env.PINATA_GATEWAY_URL}${content.fileHash}`}
            alt="project img"
            height={400}
            width={300}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        )}
      </div>
      {/* <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <a href={href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </a>
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-sm italic text-gray-500">{options}</p>
          <p className="text-base font-medium text-gray-900">{price}</p>
        </div>
      </div> */}
    </>
  );
}
