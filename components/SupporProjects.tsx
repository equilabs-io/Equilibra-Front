"use client";
import { useEffect, useState, useRef } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { useDebounce } from "@/hooks/useDebounce";
import { DonutChart } from "./DonutChart";
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

export const SupporProjects = ({ pool }: { pool: string }) => {
  const { address: participant } = useAccount();

  //TODO! Info to show in the dashboard:
  //Pool: ListName - projects - support - total support - percentage of support
  //MimeToken: name, symbol, balance, total supply
  //Participant: address, Mimetoken balance, Staked balance, percentage of support
  //Checkout - difference between new support and previous support

  //Send Transaction:
  //Loading state:
  //Success state:
  //Error state:

  //!contractWrite
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
  // const { data }: any = useContractRead({
  //   address: "",
  //   chainId: 5,
  //   abi: ABI,
  //   functionName: "name",
  // });

  const [participantSupports, setParticipantSupports] = useState([]);
  const [values, setValues] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
  ]);
  const [maxValue, setMaxValue] = useState(350);
  const [hasValueChanged, setHasValueChanged] = useState(false);
  const previousValuesRef = useRef<{ id: number; value: number }[]>([]);

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
  console.log(actualCurrentValue);

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
            You can give support with your tokens to the projects you selected{" "}
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
        <div>
          <button onClick={() => write?.()} className="border-2 w-full p-2">
            SEND TRANSACTION
          </button>
          {isLoading && (
            <div className="border-2 absolute top-0 left-0 w-full h-full bg-surface">
              Check Wallet
            </div>
          )}
          {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div>

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
          {/*Reset button for all disabled inputs */}
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
};
