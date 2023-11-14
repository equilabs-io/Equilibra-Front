"use client";
import { useEffect, useState, useRef } from "react";

import { useAccount, useContractRead } from "wagmi";
import { getUrqlClient } from "@/services/urqlService";
import * as ABI from "@/constants/abis/MimeToken.json";
import * as OWNABLE_ABI from "@/constants/abis/OwnableList.json";

const osmoticPool = `(id: "0xdc66c3c481540dc737212a582880ec2d441bdc54") {
  id
  poolProjects(first: 10) {
    id
    poolProjectSupports {
      support
      poolProjectParticipantsSupports {
        support
        participant
      }
    }
  }
}`;

export default function Support() {
  const { address: participant } = useAccount();
  const [participantSupports, setParticipantSupports] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);

  // const { data }: any = useContractRead({
  //   address: "",
  //   chainId: 5,
  //   abi: ABI,
  //   functionName: "name",
  // });

  function getFourChars(str: string, indexFunc: any): string {
    if (!str) return "";
    const lastDashIndex = indexFunc(str, "-");
    const fourChars = str.substring(lastDashIndex - 3, lastDashIndex);
    const id = fourChars.substring(0, 1);
    return id;
  }

  console.log(participantSupports[0]?.support?.toString());

  // console.log(
  //   getFourChars(participantSupports[0].id, (str) => str.lastIndexOf("-"))
  // );

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

  const [value1, setValue1] = useState(100);
  const [value2, setValue2] = useState(200);
  const [maxValue, setMaxValue] = useState(350);
  const [currentValue, setCurrentValue] = useState(value1 + value2);

  let currentSlidersValue = [
    [7, value1],
    [8, value2],
  ];

  const handleValueChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (e.target.id === "range1") {
      if (newValue + value2 <= maxValue) {
        setValue1(newValue);
      }
    } else if (e.target.id === "range2") {
      if (newValue + value1 <= maxValue) {
        setValue2(newValue);
      }
    }
  };

  useEffect(() => {
    setCurrentValue(value1 + value2);
  }, [value1, value2]);

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-primary">My support List</h2>
        <div>
          <p>
            You can give support with your tokens to the projects you selected
          </p>
          <div className="max-w-max mt-2 space-y-2">
            <p className="">Your Balances:</p>
            <span className="mr-2 text-2xl font-mono">{maxValue}</span>
            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-surface px-4 py-1  font-medium text-primary_var">
              FTK
            </span>
            <div>
              <span className="mr-2 text-2xl font-mono"> {currentValue}</span>
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-surface px-4 py-1  font-medium text-primary">
                FTK STAKED
              </span>
            </div>
          </div>
        </div>
        {/* <div>
          <DonutChart maxValue={maxValue} currentValue={currentValue} />
        </div> */}
        <div className="">
          <label
            htmlFor="medium-range"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {1} : {value1}
          </label>
          <input
            type="range"
            id="range1"
            //disabled={value2 + value1 === maxValue}
            name="range1"
            min="0"
            max="350"
            value={value1}
            onChange={handleValueChange}
            className="disabled:opacity-50 w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            step={10}
          />
        </div>
        <div>
          <label
            htmlFor="medium-range"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project 2: {value2}
          </label>
          <input
            type="range"
            //disabled={value2 + value1 === maxValue}
            id="range2"
            min="0"
            max="350"
            value={value2}
            onChange={handleValueChange}
            className="disabled:opacity-50 w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            step={1}
          />
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {participantSupports.slice(4, 6).map((project, index) => (
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
                        {getFourChars(project.id, (str) =>
                          str.lastIndexOf("-")
                        )}
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
                {/* <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <button
                      onClick={() => handleSupportIncrement(index)}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400"
                    >
                      Add
                    </button>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <button
                      onClick={() => handleSupportDecrement(index)}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-400"
                    >
                      Remove
                    </button>
                  </div>
                </div> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

interface DonutChartProps {
  maxValue: number;
  currentValue: number;
}

const DonutChart = ({ maxValue, currentValue }: DonutChartProps) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 1.8 * Math.PI * radius;
  const percentage = (currentValue / maxValue) * 100;
  const offset = circumference - (percentage / 100) * circumference;
  const strokeDasharray =
    percentage >= 100
      ? `${circumference} ${circumference}`
      : `${circumference} ${circumference}`;

  const [showPercentage, setShowPercentage] = useState(false);

  const handleMouseOver = () => {
    setShowPercentage(true);
  };

  const handleMouseOut = () => {
    setShowPercentage(false);
  };

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="var(--color-background)"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke={percentage >= 50 ? "#3b82f6" : "var(--color-primary)"}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      {showPercentage && (
        <text
          x={radius}
          y={radius + 10}
          textAnchor="middle"
          fontSize="16px"
          fontWeight="bold"
          fill={percentage >= 50 ? "#3b82f6" : "var(--color-primary)"}
        >
          {percentage.toFixed(0)}%
        </text>
      )}
    </svg>
  );
};

//     <ul
// role="list"
// className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
// >
// {participantSupports.map((project, index) => (
//   <li
//     key={project.id}
//     className="col-span-1 divide-y divide-gray-200 rounded-lg bg-background border shadow"
//   >
//     <div className="flex w-full items-center justify-between space-x-6 p-6">
//       <div className="flex-1 truncate">
//         <div className="flex items-center space-x-3">
//           <h3 className="truncate text-sm font-medium text-gray-400">
//             id:
//             <span className="text-lg text-primary">
//               {getFourChars(project.id, (str) =>
//                 str.lastIndexOf("-")
//               )}
//             </span>
//           </h3>
//           <span className="inline-flex flex-shrink-0 items-center rounded-full bg-surface px-4 py-1 text-lg font-medium text-secondary ring-1 ring-inset ring--600/20">
//             {project.support}
//           </span>
//         </div>
//         <p className="mt-1 truncate text-sm text-gray-500"></p>
//       </div>
//       <img
//         className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
//         src={`https://effigy.im/a/0x5BE8Bb8d7923879c3DDc9c551C5Aa85Ad0Fa4dE3.png`}
//         alt=""
//       />
//     </div>
//     <div>
//       <div className="-mt-px flex divide-x divide-gray-200">
//         <div className="flex w-0 flex-1">
//           <button
//             onClick={() => handleSupportIncrement(index)}
//             className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400"
//           >
//             {/* <EnvelopeIcon
//         className="h-5 w-5 text-gray-400"
//         aria-hidden="true"
//       /> */}
//             Add
//           </button>
//         </div>
//         <div className="-ml-px flex w-0 flex-1">
//           <button
//             onClick={() => handleSupportDecrement(index)}
//             className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-400"
//           >
//             {/* <PhoneIcon
//         className="h-5 w-5 text-gray-400"
//         aria-hidden="true"
//       /> */}
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   </li>
// ))}
// </ul>
