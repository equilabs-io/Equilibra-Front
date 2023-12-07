import React from 'react';
import Image from 'next/image';

import CustomButton from './CustomButton';
import { Link } from './Link';

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
    const hyphenIndex = str.indexOf('-');
    if (hyphenIndex !== -1 && hyphenIndex < str.length - 1) {
      return str.charAt(hyphenIndex + 1);
    }
    return '';
  }

  const handle = () => {
    console.log('hello');
  };

  return (
    <section className="group relative flex flex-col overflow-hidden rounded-lg bg-surface p-2 hover:shadow-md hover:shadow-highlight">
      <div className="sm:aspect-none h-[180px] bg-white group-hover:opacity-100 ">
        {category && (
          <div className="absolute left-2 top-2 m-2 flex flex-1 flex-col justify-end">
            {/* <span className="opacity-80  inline-flex items-center rounded-full bg-primary px-4 py-2 text-2xl font-medium text-black transition-opacity duration-200 ease-in">
              {getFirstLetterAfterHyphen(id)}
            </span> */}
          </div>
        )}
        {(content?.fileHash && (
          // TODO! SEE image error when "use client"
          <Image
            src={`${process.env.PINATA_GATEWAY_URL}${fileHash}`}
            alt="project img"
            height={400}
            width={300}
            className="h-full w-full object-cover object-center"
          />
        )) ||
          ''}
      </div>
      <div className="flex flex-1 flex-col bg-surface p-4 transition-all duration-200 ease-out">
        <Link href={`/demo/projects/${id}`}>
          <h3 className="mb-1 truncate">{name ? name : '-no name-'}</h3>
        </Link>
        <p className="mb-0 line-clamp-3 min-h-[75px] font-thin text-textSecondary">
          {description}
        </p>
      </div>
      {/* Project Details */}
      <div className="flex flex-1 flex-col gap-2 bg-surface p-4">
        <div className="flex items-center justify-between">
          <h4 className="mb-1 truncate text-textSecondary">Project Details</h4>
          <span
            className={`inline-flex max-w-fit items-center gap-x-1.5 rounded-md px-4 py-0.5 text-sm font-medium  ${
              active
                ? 'bg-surface_var text-primary_var'
                : 'bg-highlight text-red-300'
            }`}
          >
            <svg
              className={`h-1.5 w-1.5  ${
                active
                  ? 'fill-primary_var text-primary_var'
                  : 'fill-red-500 text-highlight'
              }`}
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            {active ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="flex items-center justify-between bg-highlight p-2">
          <span className="font-bold text-textSecondary">Streaming:</span>{' '}
          <span className="font-mono text-xl">{flowLastRates}</span>
        </div>

        <div className="flex items-center justify-between bg-highlight p-2">
          <span className="font-bold text-textSecondary">Amount streamed:</span>{' '}
          <span className="font-mono text-xl">0</span>
        </div>

        <div className="my-2"></div>
        <div className="flex justify-center">
          <CustomButton
            text="Add to List"
            styles={`w-full  ${
              active ? '' : 'bg-red-200 text-highlight hover:bg-red-300'
            }`}
          />
        </div>
      </div>
    </section>
  );
}
