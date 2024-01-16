"use client";
import { useState, FormEvent, useCallback } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import TransactionModal from "@/components/TransactionModal";
import { ethers } from "ethers";
import POOL_ABI from "@/constants/abis/OsmoticController.json";
import { Tab } from "@headlessui/react";
import InputText from "@/components/Form/InputText";
import InputSelect from "@/components/Form/InputSelect";
import { motion } from "framer-motion";
import { parseEther } from "viem";

interface FormState {
  governanceToken: string;
  fundingToken: string;
  listAddress: string;
  MinStake: string;
  MaxStreaming: string;
  [key: string]: string;
}

const tokens = [
  {
    name: "Super Fake DAI",
    symbol: "DAIx",
    address: "0x4e17a5e14331038a580c84172386f1bc2461f647",
  },
];

const OSMOTIC_CONTROLLER_ADDRESS = "0x0b9f52138050881C4d061e6A92f72d8851B59F8e"; //proxy
const OSMOTIC_POOL_ABI = [
  "function initialize(address,address,address,tuple(uint256,uint256,uint256,uint256))",
]; //used for encoding data

export default function CreatePool() {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  let [categories] = useState([
    {
      name: "Info",
      component: <Form />,
    },
    {
      name: "Add Projects",
      component: <AddProjectList />,
    },
    {
      name: "Fund",
      component: <AddFunds />,
    },
  ]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="w-full  space-y-4 px-2 py-0 sm:px-0">
      <Tab.Group selectedIndex={selectedTabIndex}>
        <Tab.List className="flex space-x-1  bg-surface p-1">
          {categories.map((category, index) => (
            <Tab
              onClick={() => setSelectedTabIndex(index)}
              as={motion.button}
              key={category.name}
              className={({ selected }) =>
                classNames(
                  "relative w-full rounded-lg py-6 text-sm leading-5 tracking-wider lg:text-lg",
                  "ring-white/60 ring-offset-none focus:ring-none focus:outline-none ",
                  selected
                    ? "font-semibold text-primary shadow "
                    : "hover:bg-white/[0.12] text-white hover:text-textSecondary",
                )
              }
            >
              {selectedTabIndex === index && (
                <motion.div
                  layoutId="pool"
                  className="absolute left-0 top-0 h-full w-full border-b-2 border-primary"
                ></motion.div>
              )}
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((component, idx) => (
            <Tab.Panel
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key={idx}
              className={classNames(
                "rounded-xl bg-background p-3",
                "ring-offset-none focus:ring-none focus:outline-none",
              )}
            >
              {component.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

const Form = () => {
  const [formState, setFormState] = useState<FormState>({
    fundingToken: tokens[0].address,
    governanceToken: "",
    listAddress: "",
    MinStake: "",
    MaxStreaming: "",
  });
  const [encodedData, setEncodedData] = useState<string | null>(null);

  //handle form changes

  const handleChange = useCallback((value: any, name: any, index?: any) => {
    setFormState((prevFormState) => {
      const updatedState = { ...prevFormState };

      if (index !== undefined) {
        // Handle array updates
        // @ts-ignore
        updatedState[name] = [...(prevFormState[name] as any)];
        // @ts-ignore
        updatedState[name][index] = value;
      } else {
        // Handle regular field updates
        updatedState[name] = value;
      }
      if (name === "fundingToken") {
        const selectedToken = tokens.find((token) => token.address === value);

        // updatedState.listAddress = selectedToken ? selectedToken.address : "";
      }

      return updatedState;
    });
  }, []);

  const handleEncodeData = async () => {
    try {
      const { governanceToken, fundingToken, listAddress } = formState;

      // Check if addresses are valid
      if (
        !ethers.utils.isAddress(governanceToken) ||
        !ethers.utils.isAddress(fundingToken) ||
        !ethers.utils.isAddress(listAddress)
      ) {
        throw new Error("Invalid address provided");
      }

      // Encoding the data ...
      const poolInitCode = new ethers.utils.Interface(
        OSMOTIC_POOL_ABI,
      ).encodeFunctionData("initialize", [
        fundingToken,
        governanceToken,
        listAddress,
        ["999999197747000000", 1, 19290123456, "28000000000000000"],
      ]);

      setEncodedData(poolInitCode);

      return poolInitCode;
    } catch (error) {
      // Handle the error
      console.error("Error in handleEncodeData:", (error as Error).message);

      return "";
    }
  };

  //prepare for the transaction to be ready ...
  const { config } = usePrepareContractWrite({
    address: OSMOTIC_CONTROLLER_ADDRESS,
    abi: POOL_ABI,
    functionName: "createOsmoticPool",
    args: [encodedData],
    onSettled: (data) => {
      console.log("settled", data?.result);
    },
  });

  // Shoots transaction to the blockchain ..
  const { write, data, isLoading } = useContractWrite(config);

  // Wait for transaction to be mined!
  const {
    isError: isWaitError,
    isLoading: isWaitLoading,
    isSuccess: isWaitSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
    onError: (error) => {
      console.log("error", error);
    },
  });

  console.log("loading", isLoading, isWaitLoading);

  //handle form to submit to the blockchain and create the pool
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Await the result of handleEncodeData
      const encodedData = await handleEncodeData();

      // Check if encodedData is not empty
      if (encodedData) {
        //shoot!
        write?.();
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error ?? "");
    }
  };

  return (
    <>
      <h4 className="text-textSecondary">Fill the form to create a pool</h4>

      <form
        className="mx-auto  w-full overflow-y-auto rounded-lg"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="space-y-2">
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <InputSelect
                  list={tokens}
                  label="Funding token"
                  name="fundingToken"
                  handleChange={(value) => handleChange(value, "fundingToken")}
                  required
                />
              </div>
              <div className="sm:col-span-4">
                <InputText
                  label="Governance token address"
                  name="governanceToken"
                  handleChange={(value) =>
                    handleChange(value, "governanceToken")
                  }
                  value={formState.governanceToken}
                  type="text"
                  placeholder="Governance token contract address..."
                  required
                />
              </div>
              <div className="sm:col-span-4">
                <InputText
                  label="List address"
                  name="list address"
                  handleChange={(value) => handleChange(value, "listAddress")}
                  value={formState.listAddress}
                  type="text"
                  placeholder="Governance token contract address..."
                  required
                />
              </div>
              <div className="sm:col-span-4">
                <InputText
                  label="Minimun Stake"
                  name="Minimun Stake"
                  handleChange={(value) => handleChange(value, "MinStake")}
                  value={formState.MinStake}
                  type="number"
                  placeholder="4%..."
                  required
                  disabled={true}
                />
              </div>

              <div className="sm:col-span-4">
                <InputText
                  disabled={true}
                  label="Max streaming per month"
                  name="max Stream Month"
                  handleChange={(value) => handleChange(value, "MaxStreaming")}
                  value={formState.MaxStreaming}
                  type="number"
                  placeholder="5%..."
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-x-6">
          <TransactionModal
            isLoading={isLoading}
            isSuccess={isWaitSuccess}
            isError={isWaitError}
            writeFunction={handleEncodeData}
            disabledButton={
              formState.governanceToken === "" || formState.listAddress === ""
            }
            label="Create Pool"
          />
          {/* <CustomButton
            text={`${isLoading ? "Creating ..." : "Create pool"}`}
            type="submit"
            handleOnClick={() => handleEncodeData()}
            disabled={
              formState.governanceToken === "" || formState.listAddress === ""
            }
          /> */}
        </div>
      </form>
    </>
  );
};

const AddProjectList = () => {
  return (
    <>
      {/* TODO: add projects and logic  */}
      <h2>Congratulation! ..you just create a pool with the addres:</h2>
      <h4>
        Select the projects you would like to be elegible bt the community
      </h4>
    </>
  );
};

const AddFunds = () => {
  const [value, setValue] = useState("");
  const [to, setTo] = useState("0xf46c2a3c093Ecf5c8F9b0B76e0A449f42739A25b");

  const { config } = usePrepareContractWrite({
    address: "0x4e17a5e14331038a580C84172386F1bc2461F647",
    //ERC20 abi transfer function
    abi: [
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "success", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "transfer",
    args: [
      to,
      parseEther(value), // convert to wei
    ],
  });
  const { data, isLoading, isSuccess, write, isError, error } =
    useContractWrite(config);

  const {
    isLoading: isWaitLoading,
    isSuccess: isWaitSuccess,
    // isError,
    // error,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      <h4>
        How much <span className="text-primary">Super Fake Dai</span> do you
        want to deposit to the pool?
      </h4>
      <div className="flex h-[600px] w-full flex-col items-center justify-center space-y-8">
        <div>
          <label htmlFor="price" className="sr-only">
            Fund
          </label>
          <div className="relative mt-2 h-64 w-64 rounded-full shadow-sm ">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className="border-1 block h-full  w-full rounded-full bg-surface py-1.5 pl-7 pr-12 text-center ring-1 ring-surface_var  transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 sm:text-sm sm:leading-6 md:text-2xl"
              placeholder="0.00"
              aria-describedby="price-currency"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-primary sm:text-sm" id="price-currency">
                DAIx
              </span>
            </div>
          </div>
        </div>
        <div>
          <TransactionModal
            isLoading={isLoading}
            isWaitLoading={isWaitLoading}
            isSuccess={isSuccess}
            isWaitSuccess={isWaitSuccess}
            isError={isError}
            error={error}
            writeFunction={write}
            label="Deposit"
          />
        </div>

        {/* {isWaitSuccess && (
          <>
            <div className="group flex flex-col items-center space-y-2 rounded-xl bg-surface px-8 py-2 transition-all duration-300 ease-in">
              <span className="text-primary transition-all duration-500 ease-in-out group-hover:scale-75 group-hover:text-textSecondary">
                Funds Sent successfully !
              </span>
              <Link
                href="/demo/dashboard"
                className="text-textSecondary transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:text-primary"
              >
                <span className="">
                  Go to Dashbaord, Claim your voting Power and Stake on your
                  favorite Projects
                </span>
              </Link>
            </div>
          </>
        )} */}
        <button onClick={() => write?.()}>Depo</button>
      </div>
    </>
  );
};
