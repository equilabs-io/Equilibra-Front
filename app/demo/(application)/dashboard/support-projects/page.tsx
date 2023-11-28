"use client";
import { useEffect, useState, useRef } from "react";

import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { useDebounce } from "@/hooks/useDebounce";
import { getUrqlClient } from "@/services/urqlService";
import * as ABI from "@/constants/abis/MimeToken.json";
import POOL_ABI from "@/constants/abis/Pool.json";

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

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xDC66c3c481540dC737212A582880EC2D441BDc54",
    abi: POOL_ABI,
    functionName: "supportProjects",
    args: [
      [
        [7, 20],
        [8, 10],
      ],
    ],
    onError(error) {
      console.log(error);
    },
  });

  const [participantSupports, setParticipantSupports] = useState([]);
  const [values, setValues] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
  ]);
  const [maxValue, setMaxValue] = useState(350);

  const [hasValueChanged, setHasValueChanged] = useState(false);
  const previousValuesRef = useRef<{ id: number; value: number }[]>([]);

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

      // result.data.poolProjectParticipantSupports.map((_support: any) =>
      //   console.log(_support)
      // );

      setValues([
        {
          id: 7,
          value: +result.data.poolProjectParticipantSupports[4].support,
        },
        {
          id: 8,
          value: +result.data.poolProjectParticipantSupports[5].support,
        },
      ]);
    };

    fetchParticipantSupports();
  }, []);

  let actualCurrentValue = values.reduce((acc, curr) => acc + curr.value, 0);

  const handleValueChange = (index: number, newValue: number) => {
    // Update the corresponding value in the values array
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], value: newValue };
      return updatedValues;
    });

    // Update the actualCurrentValue
    const newCurrentValue = values.reduce((acc, curr) => acc + curr.value, 0);
  };

  const resetToInitialState = () => {
    setValues([
      { id: 1, value: 100 },
      { id: 2, value: 200 },
    ]);
    setMaxValue(350);
    // Reset any other state variables you might have
  };

  const handleResetValues = () => {
    if (isMaxValueReached) {
      resetToInitialState();
    }
  };

  useEffect(() => {
    // Update previousValuesRef whenever values change
    previousValuesRef.current = values.map((valuesss) => {
      return { id: valuesss.id, value: valuesss.value };
    });
  }, [values]);

  //Array to store the values before submiting transaction later
  let checkoutValues: number[] = [];
  const generateCheckoutArray = () => {
    checkoutValues = [];
    values.forEach((value, index) => {
      if (value.value === previousValuesRef.current[index].value) {
        checkoutValues.push([value.id, value.value]);
      }
    });
    return checkoutValues;
  };

  const isMaxValueReached = actualCurrentValue === maxValue;

  return (
    <>
      <div className="space-y-6 px-6">
        <h2 className="text-primary">My support List</h2>
        <div>
          <p>
            You can give support with your tokens to the projects you selected
          </p>
          <div className="mt-2 w-full flex items-center">
            <div className="space-y-2">
              <p className="">Your Balances:</p>
              <span className="mr-2 text-2xl font-mono">{maxValue}</span>
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-surface px-4 py-1  font-medium text-primary">
                FTK
              </span>
              <div>
                <span className="mr-2 text-2xl font-mono">
                  {actualCurrentValue}
                </span>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-surface px-4 py-1  font-medium text-primary">
                  FTK already staked
                </span>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <DonutChart
                maxValue={maxValue}
                currentValue={actualCurrentValue}
              />
            </div>
          </div>
        </div>
        {/* //! testting sending support throw interface */}
        {/* <div>
          <button onClick={() => write?.()} className="border-2 w-full p-2">
            SEND TRANSACTION
          </button>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div> */}

        {/* <div>
          <DonutChart maxValue={maxValue} currentValue={currentValue} />
        </div> */}
        {/* <div className="">
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
        </div> */}
        <p></p>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {values.map((value, index) => (
            <>
              <li
                key={value.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-background shadow-md hover:shadow-slate-500 cursor-pointer transition-all duration-300 ease-in-out"
              >
                <div className="px-4 py-2">
                  <label
                    htmlFor="medium-range"
                    className="mb-2 text-md font-mono text-gray-900 dark:text-white flex items-center justify-evenly"
                  >
                    id: {value.id}
                    <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 font-medium text-white ring-1 ring-inset ring-gray-800 font-mono text-2xl">
                      <svg
                        className="h-1.5 w-1.5 fill-green-400"
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle cx={3} cy={3} r={3} />
                      </svg>
                      {value.value}
                    </span>
                  </label>
                  <input
                    type="range"
                    id={`range${index + 1}`}
                    disabled={isMaxValueReached}
                    name={`range${index + 1}`}
                    min="0"
                    max={maxValue}
                    value={value.value}
                    onChange={(e) =>
                      handleValueChange(index, parseInt(e.target.value))
                    }
                    className="appearance-none bg-transparent w-full cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    step={10}
                  />
                </div>
              </li>
            </>
          ))}
          {/* Reset button for all disabled inputs */}
        </ul>
        {isMaxValueReached && (
          <>
            <div className="flex">
              <span className="border-2 p-2 border-red-400 rounded-md">
                You reach the maximum support value of {maxValue}, please
                checkout or reset and try again
              </span>
              <button
                onClick={handleResetValues}
                className="bg-secondary text-white px-4 py-2 rounded-md ml-4 "
              >
                Reset All Values
              </button>
            </div>
          </>
        )}
        <div className="mt-24">
          <button
            onClick={() => console.log(generateCheckoutArray())}
            className="text-primary px-4 py-4 rounded-md  w-full border border-primary hover:bg-primary  hover:text-black transition-all  duration-200 ease-in-out font-semibold"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

interface DonutChartProps {
  maxValue: number;
  currentValue: number;
}

const DonutChart = ({ maxValue, currentValue }: DonutChartProps) => {
  const radius = 80;
  const strokeWidth = 40;
  const circumference = 1.5 * Math.PI * radius;
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
        stroke={
          percentage >= 50 ? "var(--color-secondary)" : "var(--color-primary)"
        }
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
          fontSize="24px"
          fontWeight="bold"
          fill={
            percentage >= 50 ? "var(--color-secondary)" : "var(--color-primary)"
          }
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

// {participantSupports?.slice(4, 6).map((project, index) => (
//   <li
//     key={project.id}
//     className="col-span-1 divide-y divide-gray-200 rounded-lg bg-background border shadow"
//   >
//     <div className="flex w-full items-center justify-between space-x-6 p-6">
//       <div className="">
//         <label
//           htmlFor="medium-range"
//           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//         >
//           <span className="text-lg text-primary">
//             {getFourChars(project.id, (str) => str.lastIndexOf("-"))}
//           </span>{" "}
//           : {project.support}
//         </label>

//         <input
//           type="range"
//           id={`range${index + 1}`}
//           name={`range${index + 1}`}
//           min="0"
//           max={maxValue}
//           value={project[0]?.support}
//           onChange={handleValueChange}
//           className="disabled:opacity-50 w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//           step={10}
//         />
//       </div>
//       {/* <div className="flex-1 truncate">
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
//       /> */}
//     </div>
//     <div>
//       {/* <div className="-mt-px flex divide-x divide-gray-200">
//         <div className="flex w-0 flex-1">
//           <button
//             onClick={() => handleSupportIncrement(index)}
//             className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400"
//           >
//             Add
//           </button>
//         </div>
//         <div className="-ml-px flex w-0 flex-1">
//           <button
//             onClick={() => handleSupportDecrement(index)}
//             className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-400"
//           >
//             Remove
//           </button>
//         </div>
//       </div> */}
//     </div>
//   </li>
// ))}
