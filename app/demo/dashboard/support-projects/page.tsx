"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getUrqlClient } from "@/services/urqlService";

export default function Support() {
  const { address: participant } = useAccount();
  const [participantSupports, setParticipantSupports] = useState([]);

  function getFourChars(str: string, indexFunc: IndexFunc): string {
    const lastDashIndex = indexFunc(str, "-");
    const fourChars = str.substring(lastDashIndex - 4, lastDashIndex);
    return fourChars;
  }

  const handleSupportChange = (index, value) => {
    setParticipantSupports((prevState) => {
      const newState = [...prevState];
      newState[index].support = value;
      return newState;
    });
  };

  const handleSupportIncrement = (index) => {
    setParticipantSupports((prevState) => {
      const newState = [...prevState];
      newState[index].support++;
      return newState;
    });
  };

  const handleSupportDecrement = (index) => {
    setParticipantSupports((prevState) => {
      const newState = [...prevState];
      newState[index].support--;
      return newState;
    });
  };

  useEffect(() => {
    const participantSupportQuery = `
        query ($participant: String!) {
          poolProjectParticipantSupports(first: 100, where: {participant: $participant}) {
            id    
            support
          }
        }
      `;

    const fetchParticipantSupports = async () => {
      const result = await getUrqlClient().query(participantSupportQuery, {
        participant,
      });
      setParticipantSupports(result.data.poolProjectParticipantSupports);
    };

    fetchParticipantSupports();
  }, [participant]);

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {participantSupports.map((project, index) => (
          <li
            key={project.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-background border shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-400">
                    id:
                    <span className="text-lg text-primary">
                      {getFourChars(project.id, (str) => str.lastIndexOf("-"))}
                    </span>
                  </h3>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-surface px-4 py-1 text-lg font-medium text-secondary ring-1 ring-inset ring--600/20">
                    {project.support}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500"></p>
              </div>
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src={`https://effigy.im/a/0x5BE8Bb8d7923879c3DDc9c551C5Aa85Ad0Fa4dE3.png`}
                alt=""
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button
                    onClick={() => handleSupportIncrement(index)}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400"
                  >
                    {/* <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  /> */}
                    Add
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    onClick={() => handleSupportDecrement(index)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-400"
                  >
                    {/* <PhoneIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  /> */}
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
