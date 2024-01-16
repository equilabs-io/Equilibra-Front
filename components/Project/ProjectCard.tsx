import { Link } from "../Link";
import AddListButton from "./AddListButton";
import { ProjectIdBadge } from "./ProjectIdBadge";
import Image from "next/image";

type Project = {
  flowLastRates: any;
  flowLastTime: any;
  active: any;
  content: any;
  contentHash: any;
  admin: string;
  beneficiary: string;
  id: string;
  list: string[];
  __typename: string;
};

// interface Content {
//   description: string;
//   link: string;
//   fileHash: string;
//   name: string;
//   category: string;
// }

export default function ProjectCard({
  project,
  projectCheckout,
}: {
  project: Project;
  projectCheckout: (newId: string) => void;
}) {
  const {
    id,
    admin,
    beneficiary,
    contentHash,
    content,
    flowLastRates,
    flowLastTime,
    active,
    list,
  } = project;

  const { description, link, fileHash, name, category } = content;

  const pinataGateWay =
    "https://tomato-commercial-jellyfish-816.mypinata.cloud/ipfs/";

  return (
    <section className="group relative flex flex-col rounded-lg  bg-surface p-2 hover:shadow-md hover:shadow-highlight">
      <div className="sm:aspect-none h-[180px]  bg-background">
        {category && (
          <div className="absolute left-2 top-2 m-2 flex flex-1 flex-col justify-end">
            {/* {category} */}
          </div>
        )}
        <Image
          src={`${pinataGateWay}${fileHash}`}
          alt="project img"
          height={400}
          width={300}
          className="h-full w-full object-cover object-center opacity-80"
        />
      </div>
      <div className="flex flex-1 flex-col  items-start justify-between overflow-hidden bg-surface p-4 transition-all duration-200 ease-out">
        <Link href={`/demo/projects/${id}`}>
          <span className="mb-4 line-clamp-1 text-lg">
            {name ? name : "-no name-"}
          </span>
        </Link>
        <span className="line-clamp-3 min-h-[75px] text-sm font-thin text-textSecondary">
          {description}
        </span>
      </div>
      {/* Project Details */}
      <div className="flex flex-1 flex-col gap-2 bg-surface p-4">
        <div className="flex items-center justify-between">
          <span className="text-md mb-1 truncate text-textSecondary">
            Project Details
          </span>
          <ProjectIdBadge id={id} />

          {/* TODO: check if add active status ?? */}
        </div>

        <div className="flex items-center justify-between bg-highlight p-2">
          <span className="text-textSecondary">Streaming:</span>{" "}
          <span className="text-md">{flowLastRates}</span>
        </div>
        <div className="flex items-center justify-between bg-highlight p-2">
          <span className="text-textSecondary">Amount streamed:</span>{" "}
          <span className="text-md">0</span>
        </div>
        <div className="my-2"></div>
        <AddListButton
          projectList={list}
          active={active}
          id={id}
          projectCheckout={projectCheckout}
        />
      </div>
    </section>
  );
}

{
  /* <span
            className={`inline-flex max-w-fit items-center gap-x-1.5 rounded-md px-4 py-0.5 text-sm font-medium  ${
              active
                ? "bg-surface_var text-primary_var"
                : "bg-highlight text-red-300"
            }`}
          >
            <svg
              className={`h-1.5 w-1.5  ${
                active
                  ? "fill-primary_var text-primary_var"
                  : "fill-red-500 text-highlight"
              }`}
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            {active ? "Active" : "Inactive"}
          </span> */
}
