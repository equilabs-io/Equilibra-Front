import Image from "next/image";

interface Project {
  id: string;
  admin: string;
  beneficiary: string;
  contentHash: string;
  content: any;
  __typename: string;
}

export const SupportCard = ({ project }: { project: Project }) => {
  const { id, admin, beneficiary, contentHash, content } = project;

  const { fileHash, name } = content;

  return (
    <>
      <ul role="list" className="">
        <li className="overflow-hidden rounded-xl ">
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-primary text-black p-6">
            {content?.fileHash && (
              <img
                src={`${process.env.PINATA_GATEWAY_URL}${fileHash}`}
                alt="project img"
                className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
              />
            )}
            <div className="text-sm font-medium leading-6 text-gray-900">
              {name ? name : "-no name-"}
            </div>
            <div className="text-sm font-medium leading-6 text-gray-900 text-elipsis max-w-[100px]">
              {beneficiary}
            </div>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <button className="text-primary border-2 p-2 border-gray-700 rounded-full">
                Add Support
              </button>
              <button className="text-red-400 border-2 p-2 border-gray-700 rounded-full">
                Remove Support
              </button>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Staked</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-200">
                  {Math.floor(Math.random() * (100 - 10 + 1)) + 10}
                </div>
              </dd>
            </div>
          </dl>
        </li>
      </ul>
    </>
  );
};
