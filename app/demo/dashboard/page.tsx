import { getUrqlClient } from "@/services/urqlService";
import { get } from "http";

const participantSupportQuery = `
    query ($participant: String!) {
        poolProjectParticipantSupports(first: 100, where: {participant: $participant}) {
            id    
           
            support
        }
    }
`;
export default async function ProfileDashboard() {
  const address = "0x5be8bb8d7923879c3ddc9c551c5aa85ad0fa4de3";

  const participantSupport = await getUrqlClient().query(
    participantSupportQuery,
    { participant: address }
  );

  //participant - staker - contributor - supporter, support to projects
  const participantSupports =
    participantSupport.data.poolProjectParticipantSupports;

  type IndexFunc = (str: string, char: string) => number;

  //helper function to get the last 4 chars of a string
  function getFourChars(str: string, indexFunc: IndexFunc): string {
    const lastDashIndex = indexFunc(str, "-");
    const fourChars = str.substring(lastDashIndex - 4, lastDashIndex);
    return fourChars;
  }
  const projects = [
    {
      id: 1,
      name: "Logo redesign",
      description: "New logo and digital asset playbook.",
      hours: "20.0",
      rate: "$100.00",
      price: "$2,000.00",
    },
    {
      id: 1,
      name: "Logo redesign",
      description: "New logo and digital asset playbook.",
      hours: "20.0",
      rate: "$100.00",
      price: "$2,000.00",
    },
    // More projects...
  ];

  return (
    <>
      <div className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        <header>
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10  sm:flex-row sm:items-center">
            Eth address: {address}
          </div>
        </header>
        <Wrapper>
          <ProjectSupport projects={projects} />
        </Wrapper>
        {/* <Wrapper label="Supported Projects">
          {participantSupports.map((support: any) => (
            <>
              <div
                className="space-y-2 flex justify-between border-b-[1px] border-surface rounded-lg p-4]"
                key={support.id}
              >
                <div className="">
                  id: {getFourChars(support.id, (str) => str.lastIndexOf("-"))}
                </div>
                <div className="">
                  pool: {getFourChars(support.id, (str) => str.indexOf("-"))}
                </div>
                <div>{support.support}</div>
              </div>
            </>
          ))}
        </Wrapper> */}
      </div>
    </>
  );
}
type WrapperProps = {
  label?: string;
  children?: React.ReactNode;
};

const Wrapper = ({ label = "Projects", children }: WrapperProps) => {
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <h2 className="text-primary ">{label}</h2>
        <div className="border-[1px] border-surface w-full min-h-content rounded-bl-3xl flex flex-col p-4 shadow-md shadow-surface">
          {children}
        </div>
      </div>
    </>
  );
};

export function ProjectSupport({ projects }: any) {
  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {/* <p className="mt-2 text-sm text-gray-300">
            participant project Support{" "}
            <time dateTime="2022-08-01"> November 8, 2023</time>
          </p> */}
        </div>
      </div>
      <div className="-mx-4 mt-8 flow-root sm:mx-0">
        <table className="min-w-full">
          <colgroup>
            <col className="w-full sm:w-1/2" />
            <col className="sm:w-1/6" />
            <col className="sm:w-1/6" />
            <col className="sm:w-1/6" />
          </colgroup>
          <thead className="border-b border-slate-700 text-gray-300">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-0"
              >
                Project
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-300 sm:table-cell"
              >
                Pool
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-300 sm:table-cell"
              >
                Somenthing
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-300 sm:pr-0"
              >
                Support
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr key={project.id} className="border-b border-slate-800">
                <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="font-medium text-gray-300">project id</div>
                </td>
                <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                  pool id
                </td>
                <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                  something
                </td>
                <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                  amount support
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-300 sm:table-cell sm:pl-0"
              >
                Total Support
              </th>
              <th
                scope="row"
                className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-300 sm:hidden"
              >
                Total Support
              </th>
              <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-300 sm:pr-0">
                total
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
